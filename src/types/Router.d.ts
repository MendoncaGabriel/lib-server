import { IMiddleware } from "./Middleware"
import { IRequest } from "./Request";

export interface IRoute {
    method: string;
    path: string;
    middlewares: IMiddleware[];
    middleware?: IMiddleware;
}

export interface IRouter {
    add(method: string, path: string, middlewares: IMiddleware[]) : void;
    find(req: IRequest): IRoute | undefined
}