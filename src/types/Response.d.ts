import { ServerResponse } from 'node:http';

export interface IResponse extends ServerResponse {
    send(data?: string | Buffer, encoding?: BufferEncoding): this;
    locals: { [key: string]: any };
}
