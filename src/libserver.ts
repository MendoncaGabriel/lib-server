// libserver.ts
import http, { IncomingMessage, ServerResponse } from "node:http";
import Router from "./Router";
import RequestHandler from "./RequestHandler";
import { IResponse } from "./types/Response";

// middlewares
import jsonBodyParsing from "./middlewares/json";
import uploadMiddleware from "./middlewares/upload";

// interfaces
import { IServer } from "./types/Server";
import { IMiddleware } from "./types/Middleware";
import { IRestMethods } from "./types/RestMethods";
import { UploadOptions } from "./types/UploadOptions";

// utils
import { extendResponse } from "./utils/extendResponse";

class RootRouter {
  private router: Router;
  private prefix: string;

  constructor(prefix: string = "") {
    this.router = new Router();
    this.prefix = prefix;  // Define o prefixo
  }

  get(path: string, ...middlewares: IMiddleware[]): void {
    const fullPath = this.prefix + path;
    this.router.addMiddleware("GET", fullPath, middlewares);
  }

  post(path: string, ...middlewares: IMiddleware[]): void {
    const fullPath = this.prefix + path;
    this.router.addMiddleware("POST", fullPath, middlewares);
  }

  put(path: string, ...middlewares: IMiddleware[]): void {
    const fullPath = this.prefix + path;
    this.router.addMiddleware("PUT", fullPath, middlewares);
  }

  patch(path: string, ...middlewares: IMiddleware[]): void {
    const fullPath = this.prefix + path;
    this.router.addMiddleware("PATCH", fullPath, middlewares);
  }

  delete(path: string, ...middlewares: IMiddleware[]): void {
    const fullPath = this.prefix + path;
    this.router.addMiddleware("DELETE", fullPath, middlewares);
  }

  // Retorna o router para ser usado no servidor principal
  getRouter(): Router {
    return this.router;
  }
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

    this.server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      const adaptedReq = req as any;
      const adaptedRes = extendResponse(res); 
      this.requestHandler.handleRequest(adaptedReq, adaptedRes);
    });
  }

  use(middleware: IMiddleware) {
    this.middlewares.push(middleware);
  }

  json() {
    return jsonBodyParsing;
  }

  upload(options: UploadOptions) {
    return uploadMiddleware(options);
  }

  root(prefix: string, rootRouter: RootRouter): void {
    this.router.addRouterWithPrefix(prefix, rootRouter.getRouter());
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

export { Server, RootRouter };
