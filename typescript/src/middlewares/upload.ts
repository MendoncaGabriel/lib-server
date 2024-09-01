import fs from 'fs';
import path from 'path';
import { IRequest } from '../types/Request';
import { UploadOptions } from "../types/UploadOptions";

const uploadMiddleware = (options: UploadOptions) => {
  const uploadDir = path.resolve(options.path);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return (req: IRequest, res: any, next: any) => {
    if (!res.locals) {
      res.locals = {};
    }

    if (
      req.method === 'POST' && 
      req.headers['content-type'] && 
      req.headers['content-type'].startsWith('multipart/form-data')
    ) {
      const contentType = req.headers['content-type'];
      const boundary = contentType?.split('; ')[1]?.replace('boundary=', '');

      if (!boundary) {
        res.statusCode = 400;
        return res.end('Boundary ausente no content-type');
      }

      const chunks: Buffer[] = [];
      let fileSize = 0;
      const MAX_FILE_SIZE = options.maxFileSize || 50 * 1024 * 1024;

      req.on('data', (chunk: Buffer) => {
        fileSize += chunk.length;
        if (fileSize > MAX_FILE_SIZE) {
          res.statusCode = 413;
          return res.end('Arquivo muito grande');
        }
        chunks.push(chunk);
      });

      req.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks);
          const boundaryBytes = Buffer.from(`--${boundary}`);

          let startIndex = 0;
          let filesSaved = [];

          while ((startIndex = buffer.indexOf(boundaryBytes, startIndex)) !== -1) {
            startIndex += boundaryBytes.length;
            const endIndex = buffer.indexOf(boundaryBytes, startIndex);
            const part = buffer.slice(startIndex, endIndex !== -1 ? endIndex : buffer.length);
            const headerEndIndex = part.indexOf('\r\n\r\n');

            if (headerEndIndex === -1) break;

            const headers = part.slice(0, headerEndIndex).toString('utf8');
            const fileBuffer = part.slice(headerEndIndex + 4);

            const filenameMatch = headers.match(/filename="([^"]+)"/);
            if (filenameMatch) {
              const originalFilename = filenameMatch[1];
              const fileExtension = options.format || path.extname(originalFilename);
              let filename =  originalFilename;
              filename += fileExtension;

              const filePath = path.join(uploadDir, filename);

              fs.writeFileSync(filePath, fileBuffer);
              filesSaved.push(filePath);
            }

            if (endIndex === -1) break;
          }

          req.files = filesSaved;
          res.locals.uploadedFilePaths = filesSaved;
          next();
        } catch (error) {
          console.error('Erro no upload:', error);
          res.statusCode = 500;
          res.end('Erro no upload');
        }
      });

      req.on('error', (err) => {
        console.error('Erro no upload:', err);
        res.statusCode = 500;
        res.end('Erro no upload');
      });
    } else {
      next();
    }
  };
};

export default uploadMiddleware;