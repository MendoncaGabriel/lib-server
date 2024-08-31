import { IMiddleware } from "./Middleware";

export interface IRestMethods {
    get(path: string, ...middlewares: IMiddleware[]): void;
    post(path: string, ...middlewares: IMiddleware[]): void;
    put(path: string, ...middlewares: IMiddleware[]): void;
    patch(path: string, ...middlewares: IMiddleware[]): void;
    delete(path: string, ...middlewares: IMiddleware[]): void;
}