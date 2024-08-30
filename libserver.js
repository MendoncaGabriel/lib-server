import http from "node:http";

class Server {
  constructor() {
    this.server = http.createServer();
  }

  handleRequest(method, path, controller) {
    this.server.on("request", async (req, res) => {
      if (req.url === path && req.method === method) {
        try {
          await controller(req, res);
        } catch (error) {
          res.statusCode = 500;
          res.end("Erro interno do servidor");
        }
      }
    });
  }

  get(path, controller) {
    this.handleRequest("GET", path, controller);
  }
  post(path, controller) {
    this.handleRequest("POST", path, controller);
  }
  put(path, controller) {
    this.handleRequest("PUT", path, controller);
  }
  patch(path, controller) {
    this.handleRequest("PATCH", path, controller);
  }
  delete(path, controller) {
    this.handleRequest("DELETE", path, controller);
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }
}

module.exports = Server