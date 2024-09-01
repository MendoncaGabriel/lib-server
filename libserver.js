import {
  RequestHandler_default
} from "./chunk-F6JZIMTF.js";
import {
  Router_default
} from "./chunk-GRGMILWL.js";
import {
  json_default
} from "./chunk-OPEFMXSN.js";
import {
  upload_default
} from "./chunk-WI45RBZ3.js";

// src/libserver.ts
import http from "node:http";
var Server = class {
  middlewares;
  router;
  requestHandler;
  server;
  constructor() {
    this.middlewares = [];
    this.router = new Router_default();
    this.requestHandler = new RequestHandler_default(this.middlewares, this.router);
    this.server = http.createServer((req, res) => {
      const adaptedReq = req;
      const adaptedRes = res;
      this.requestHandler.handleRequest(adaptedReq, adaptedRes);
    });
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }
  json() {
    return json_default;
  }
  upload(options) {
    return upload_default(options);
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
};
var libserver_default = Server;
export {
  libserver_default as default
};
//# sourceMappingURL=libserver.js.map