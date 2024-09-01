import { IMiddleware } from "./Middleware"
import { IRequest } from "./Request";

export interface IRoute {
    method: string;
    path: string;
    middlewares: IMiddleware[];
    middleware?: IMiddleware;
}

export interface IRouter {
    addRouter(method: string, path: string, middlewares: IMiddleware[]) : void;
    findRoute(req: IRequest): IRoute | undefined
}