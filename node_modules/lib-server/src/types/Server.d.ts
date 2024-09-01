import http from 'node:http';
import { IMiddleware } from './Middleware';

export interface IServer {
  listen(port: number, cb: () => void): void;
  use(middleware: IMiddleware): void;
}