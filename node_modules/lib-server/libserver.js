// libserver.js

import http from "node:http";
import RequestHandler from "./src/RequestHandler.js";
import Router from "./src/Router.js";
import jsonBodyParsin from "./middlewares/json.js";

class Server {
  constructor() {
    this.middlewares = [];
    this.router = new Router();
    this.requestHandler = new RequestHandler(this.middlewares, this.router);
    this.server = http.createServer(this.requestHandler.handleRequest.bind(this.requestHandler));
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  json() {
    return jsonBodyParsin;
  }

  get(path, ...middlewares) {
    this.router.get(path, ...middlewares);
  }

  post(path, ...middlewares) {
    this.router.post(path, ...middlewares);
  }

  put(path, ...middlewares) {
    this.router.put(path, ...middlewares);
  }

  patch(path, ...middlewares) {
    this.router.patch(path, ...middlewares);
  }

  delete(path, ...middlewares) {
    this.router.delete(path, ...middlewares);
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }
}

export default Server;
