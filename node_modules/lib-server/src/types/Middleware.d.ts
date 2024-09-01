import { INext } from "./Next";
import { IRequest } from "./Request";
import { IResponse } from "./Response";


export interface IMiddleware {
    (req: IRequest, res: IResponse, next: INext): void;
}