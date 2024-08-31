import fs from 'fs';
import path from 'path';
import { IRequest } from '../types/Request';
import { IResponse } from '../types/Response';
import { INext } from '../types/Next';

interface UploadOptions {
  path: string;
  filename: string;
  format: string;
}

// Função para verificar o tipo de arquivo
const isImage = (filename: string, format: string): boolean => {
  const validExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
  const ext = path.extname(filename).toLowerCase();
  return validExtensions.includes(ext) && ext === `.${format}`;
};

// Middleware de upload de imagens
const uploadMiddleware = (options: UploadOptions) => {
  const uploadDir = path.resolve(options.path);

  // Certifica-se de que o diretório de upload exista
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return (req: IRequest, res: IResponse, next: INext) => {
    // Inicializa res.locals se não estiver definido
    if (!res.locals) {
      res.locals = {};
    }

    if (req.method === 'POST' && req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
      const contentType = req.headers['content-type'];
      const boundary = contentType?.split('; ')[1]?.replace('boundary=', '');

      if (!boundary) {
        res.statusCode = 400;
        return res.end('Boundary ausente no content-type');
      }

      const chunks: Buffer[] = [];
      let fileSize = 0;
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // Limite de 5MB para o arquivo

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
          const endBoundaryBytes = Buffer.from(`--${boundary}--`);

          // Encontra os índices dos limites
          let startIndex = buffer.indexOf(boundaryBytes) + boundaryBytes.length;
          let endIndex = buffer.indexOf(endBoundaryBytes);

          if (startIndex === -1 || endIndex === -1) {
            res.statusCode = 400;
            return res.end('Formato de arquivo inválido');
          }

          // Extrai o conteúdo entre os limites
          const content = buffer.slice(startIndex, endIndex);
          const headerEndIndex = content.indexOf('\r\n\r\n');

          if (headerEndIndex === -1) {
            res.statusCode = 400;
            return res.end('Cabeçalho do arquivo inválido');
          }

          const headers = content.slice(0, headerEndIndex).toString('utf8');
          const fileBuffer = content.slice(headerEndIndex + 4); // Os dados do arquivo começam após o cabeçalho e a quebra de linha extra

          // Encontra o nome do arquivo
          const filenameMatch = headers.match(/filename="([^"]+)"/);
          if (filenameMatch) {
            let filename = filenameMatch[1];
            if (!isImage(filename, options.format)) {
              res.statusCode = 400;
              return res.end('Apenas arquivos de imagem permitidos no formato especificado');
            }

            const filePath = path.join(uploadDir, options.filename + path.extname(filename));

            // Salva o arquivo
            fs.writeFile(filePath, fileBuffer, (err) => {
              if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                res.statusCode = 500;
                return res.end('Erro ao salvar o arquivo');
              }

              req.file = {
                filename: options.filename + path.extname(filename),
                path: filePath,
              };

              res.locals.uploadedFilePath = filePath; // Salva o caminho no `res.locals` para acesso posterior
              next();
            });
          } else {
            res.statusCode = 400;
            res.end('Nome do arquivo não encontrado');
          }
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
