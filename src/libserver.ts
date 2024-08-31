import http from 'node:http';
import RequestHandler from './RequestHandler';
import Router from './Router';
import jsonBodyParsin from './middlewares/json';
import { IServer } from './types/Server';
import { IRestMethods } from './types/RestMethods';
import { IMiddleware } from './types/Middleware';
import uploadMiddleware from './middlewares/upload';


interface UploadOptions {
  path: string;
  filename: string;
  format: string;
}

class Server implements IServer, IRestMethods {
  private middlewares: IMiddleware[];
  private router: Router;
  private requestHandler: RequestHandler;
  private server: http.Server;

  constructor() {
    this.middlewares = [];
    this.router = new Router();
    this.requestHandler = new RequestHandler(this.middlewares, this.router);

    this.server = http.createServer((req, res) => {
      const adaptedReq = req as any; // Ajuste se necessário
      const adaptedRes = res as any; // Ajuste se necessário
      this.requestHandler.handleRequest(adaptedReq, adaptedRes);
    });
  }

  use(middleware: IMiddleware) {
    this.middlewares.push(middleware);
  }

  json() {
    return jsonBodyParsin;
  }

  upload(options: UploadOptions) {
    return uploadMiddleware(options);
  }

  get(path: string, ...middlewares: IMiddleware[]): void {
    this.router.get(path, ...middlewares);
  }

  post(path: string, ...middlewares: IMiddleware[]): void {
    this.router.post(path, ...middlewares);
  }

  put(path: string, ...middlewares: IMiddleware[]): void {
    this.router.put(path, ...middlewares);
  }

  patch(path: string, ...middlewares: IMiddleware[]): void {
    this.router.patch(path, ...middlewares);
  }

  delete(path: string, ...middlewares: IMiddleware[]): void {
    this.router.delete(path, ...middlewares);
  }

  listen(port: number, cb: () => void): void {
    this.server.listen(port, cb);
  }
}

export default Server;
