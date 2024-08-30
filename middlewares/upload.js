import fs from 'fs';
import path from 'path';
import { Transform } from 'stream';

const uploadImagens = (req, res, next) => {
  if (req.method === 'POST' && req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    if (!boundary) {
      res.status(400).send('Erro ao identificar o boundary.');
      return;
    }

    const boundaryBuffer = Buffer.from(`--${boundary}`, 'utf-8');
    const endBoundaryBuffer = Buffer.from(`--${boundary}--`, 'utf-8');
    let fileData = [];
    let fileName = null;
    let fileStart = null;

    const parseStream = new Transform({
      transform(chunk, encoding, callback) {
        const data = Buffer.from(chunk, encoding);

        let startIndex = 0;
        while ((startIndex = data.indexOf(boundaryBuffer, startIndex)) !== -1) {
          // Find the end of the headers
          const headersEnd = data.indexOf('\r\n\r\n', startIndex);
          if (headersEnd !== -1) {
            const headerLines = data.slice(startIndex + boundaryBuffer.length, headersEnd).toString();
            const contentDisposition = headerLines.match(/Content-Disposition: form-data; name="img"; filename="([^"]+)"/);
            if (contentDisposition) {
              fileName = contentDisposition[1];
              fileStart = headersEnd + 4; // Start of file content
            }

            startIndex = headersEnd + 4;
          } else {
            startIndex += boundaryBuffer.length;
          }
        }

        // Collect file data
        if (fileStart !== null) {
          const endIndex = data.indexOf(endBoundaryBuffer, fileStart);
          if (endIndex !== -1) {
            fileData.push(data.slice(fileStart, endIndex));
            fileStart = null; // End of file content
          } else if (fileStart !== null) {
            fileData.push(data.slice(fileStart));
          }
        }

        callback();
      },
      flush(callback) {
        if (fileData.length > 0 && fileName) {
          const fileBuffer = Buffer.concat(fileData);
          const uploadDir = path.join(__dirname, 'uploads');

          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }

          const filePath = path.join(uploadDir, fileName || 'uploaded_image.png');
          fs.writeFile(filePath, fileBuffer, (err) => {
            if (err) {
              console.error('Erro ao salvar o arquivo:', err);
              res.status(500).send('Erro ao salvar o arquivo.');
              return;
            }

            req.file = {
              path: filePath,
              name: fileName || 'uploaded_image.png',
            };

            next();
          });
        } else {
          res.status(400).send('Nenhum arquivo encontrado.');
        }

        callback();
      },
    });

    req.pipe(parseStream);
  } else {
    next();
  }
};

export default uploadImagens;
