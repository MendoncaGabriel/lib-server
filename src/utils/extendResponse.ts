import { ServerResponse } from 'http';
import { IResponse } from '../types/Response';
import { setHeaderResponse } from '../utils/setHeaderResponse';
import fs from 'fs';
import path from 'path';


export function extendResponse(res: ServerResponse): IResponse {
    const extendedRes = res as IResponse;

    extendedRes.send = function (data?: string | Buffer, encoding?: BufferEncoding): IResponse {
        // Impedir recursividade acidental
        if (extendedRes.headersSent) {
            return extendedRes;
        }

        let contentType: string | undefined;

        if (typeof data === 'string' && fs.existsSync(data)) {
            // Se o dado é um caminho de arquivo existente
            const extname = path.extname(data).toLowerCase();
            contentType = extname.slice(1);
            setHeaderResponse(extendedRes, contentType);

            const fileStream = fs.createReadStream(data);
            fileStream.pipe(extendedRes);
            return extendedRes;
        } else if (typeof data === 'string') {
            // Se o dado é uma string simples
            if (data.trim().startsWith('<') && data.trim().endsWith('>')) {
                contentType = 'html';
            } else {
                contentType = 'text';
            }
            setHeaderResponse(extendedRes, contentType);

            // Passar encoding se definido, caso contrário, usar o padrão
            if (encoding) {
                extendedRes.end(data, encoding as BufferEncoding);  // Assegurar que encoding é BufferEncoding
            } else {
                extendedRes.end(data);  // Enviar texto sem encoding
            }
        } else if (typeof data === 'object' && !Buffer.isBuffer(data)) {
            // Se o dado é um objeto JSON
            contentType = 'json';
            setHeaderResponse(extendedRes, contentType);
            extendedRes.end(JSON.stringify(data));  // Enviar JSON
        } else if (Buffer.isBuffer(data)) {
            // Se o dado é um buffer
            contentType = 'binary';
            setHeaderResponse(extendedRes, contentType);
            // Passar encoding se definido, caso contrário, usar o padrão
            if (encoding) {
                extendedRes.end(data, encoding as BufferEncoding);  // Assegurar que encoding é BufferEncoding
            } else {
                extendedRes.end(data);  // Enviar buffer sem encoding
            }
        } else {
            // Caso padrão: converter o dado para string e enviar
            contentType = 'text';
            setHeaderResponse(extendedRes, contentType);
            // Passar encoding se definido, caso contrário, usar o padrão
            if (encoding) {
                extendedRes.end(String(data), encoding as BufferEncoding);  // Assegurar que encoding é BufferEncoding
            } else {
                extendedRes.end(String(data));  // Enviar string sem encoding
            }
        }

        return extendedRes;
    };

    extendedRes.locals = {};

    return extendedRes;
}
