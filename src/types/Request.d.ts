import http from 'node:http';
import { IncomingMessage } from 'node:http';


export interface IRequest extends IncomingMessage {
    params: { [key: string]: string };
    query: { [key: string]: string };
    body?: any;
    files?: string[]
    secure?: any
}
