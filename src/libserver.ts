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
      const adaptedRes = extendResponse(res); // Adapta res para incluir send

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
