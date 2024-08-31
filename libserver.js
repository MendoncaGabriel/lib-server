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

  get(path, controller) {
    this.router.get(path, controller);
  }

  post(path, controller) {
    this.router.post(path, controller);
  }

  put(path, controller) {
    this.router.put(path, controller);
  }

  patch(path, controller) {
    this.router.patch(path, controller);
  }

  delete(path, controller) {
    this.router.delete(path, controller);
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }
}

export default Server;
