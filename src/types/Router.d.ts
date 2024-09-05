import { IMiddleware } from "./Middleware"
import { IRequest } from "./Request";

export interface IRoute {
    method: string;
    path: string;
    middlewares: IMiddleware[];
    middleware?: IMiddleware;
}

export interface IRouter {
    addMiddleware(method: string, path: string, middlewares: IMiddleware[]) : void;
    addRouterWithPrefix(prefix: string, router: Router) : void;
    find(req: IRequest): IRoute | undefined
}