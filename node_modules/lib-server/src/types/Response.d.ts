import { ServerResponse } from 'node:http';

export interface IResponse extends ServerResponse {
    end(data?: string | Buffer, encoding?: string): this;
    statusCode?: number;
    locals: { [key: string]: any };
}
