import { IncomingMessage, ServerResponse } from 'node:http';

// export interface INext {
//     next: () => void
// }


type INext = (err?: any) => void;

interface IRequest extends IncomingMessage {
    params: { [key: string]: string };
    query: { [key: string]: string };
    body?: any;
    files?: string[]
    secure?: any
}

interface IResponse extends ServerResponse {
    send(data?: string | Buffer, encoding?: BufferEncoding): this;
    locals: { [key: string]: any };
}

interface IMiddleware {
    (req: IRequest, res: IResponse, next: INext): void;
}

interface IServer {
  listen(port: number, cb: () => void): void;
  use(middleware: IMiddleware): void;
}

interface IRestMethods {
    get(path: string, ...middlewares: IMiddleware[]): void;
    post(path: string, ...middlewares: IMiddleware[]): void;
    put(path: string, ...middlewares: IMiddleware[]): void;
    patch(path: string, ...middlewares: IMiddleware[]): void;
    delete(path: string, ...middlewares: IMiddleware[]): void;
}

interface UploadOptions {
    path: string
    maxFileSize?: number
    format: string
}

declare class Server implements IServer, IRestMethods {
    private middlewares;
    private router;
    private requestHandler;
    private server;
    constructor();
    use(middleware: IMiddleware): void;
    json(): (req: IRequest, res: IResponse, next: INext) => Promise<void>;
    upload(options: UploadOptions): (req: IRequest, res: any, next: any) => any;
    get(path: string, ...middlewares: IMiddleware[]): void;
    post(path: string, ...middlewares: IMiddleware[]): void;
    put(path: string, ...middlewares: IMiddleware[]): void;
    patch(path: string, ...middlewares: IMiddleware[]): void;
    delete(path: string, ...middlewares: IMiddleware[]): void;
    listen(port: number, cb: () => void): void;
}

export { Server as default };
