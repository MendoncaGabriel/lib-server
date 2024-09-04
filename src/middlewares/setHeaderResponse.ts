import { IResponse } from "../types/RequestHandler";

interface ISetHeaderResponse {
    status: number
    res: IResponse
}

export class SetHeaderResponse {
    json({ status, res }:ISetHeaderResponse) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
    }

    html({ status, res }:ISetHeaderResponse) {
        res.writeHead(status, { 'Content-Type': 'text/html' });
    }

    text({ status, res }:ISetHeaderResponse) {
        res.writeHead(status, { 'Content-Type': 'text/plain' });
    }

    xml({ status, res }:ISetHeaderResponse) {
        res.writeHead(status, { 'Content-Type': 'application/xml' });
    }

    css({ status, res }:ISetHeaderResponse) {
        res.writeHead(status, { 'Content-Type': 'text/css' });
    }

    js({ status, res }:ISetHeaderResponse) {
        res.writeHead(status, { 'Content-Type': 'application/javascript' });
    }
}