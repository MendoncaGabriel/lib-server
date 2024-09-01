import http from 'node:http';

// types/Middleware.ts
export interface IMiddleware {
  (req: IRequest, res: IResponse, next: () => void): void;
}

// types/Request.ts
import { IncomingMessage } from 'node:http';

export interface IRequest extends IncomingMessage {
  params?: { [key: string]: string };
  query?: { [key: string]: string };
}

// types/Response.ts
import { ServerResponse } from 'node:http';

export interface IResponse extends ServerResponse {}

// types/Router.ts
import { IMiddleware } from "./Middleware";

export interface IRoute {
  method: string;
  path: string;
  middlewares: IMiddleware[];
  middleware: IMiddleware;
}

export interface IRouter {
  addRouter(method: string, path: string, middlewares: IMiddleware[]): void;
  findRoute(req: IRequest): IRoute | undefined;
}
