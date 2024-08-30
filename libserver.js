import http from "node:http";

class Server {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.middlewares = [];
    this.routes = [];
  }

  // Método para adicionar middlewares
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // Middleware para parsear JSON
  json() {
    return async (req, res, next) => {
      if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
        try {
          req.body = await new Promise((resolve, reject) => {
            let bodyString = "";

            req.on("data", (chunk) => {
              bodyString += chunk.toString();
            });

            req.on("end", () => {
              try {
                resolve(JSON.parse(bodyString));
              } catch (error) {
                reject(error);
              }
            });

            req.on("error", (err) => {
              reject(err);
            });
          });
        } catch (error) {
          res.statusCode = 400;
          res.end("Erro no parse do JSON");
          return;
        }
      }
      next();  // Chama o próximo middleware ou controlador
    };
  }

  async handleRequest(req, res) {
    // Executa todos os middlewares em sequência antes de processar a rota
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        index++;
        middleware(req, res, next);  // Passa para o próximo middleware
      } else {
        // Quando todos os middlewares forem executados, processa a rota
        const route = this.routes.find(
          (r) => r.path === req.url && r.method === req.method
        );
        if (route) {
          route.controller(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
    };

    next();  // Inicia a cadeia de middlewares
  }

  addRoute(method, path, controller) {
    this.routes.push({ method, path, controller });
  }

  get(path, controller) {
    this.addRoute("GET", path, controller);
  }

  post(path, controller) {
    this.addRoute("POST", path, controller);
  }

  put(path, controller) {
    this.addRoute("PUT", path, controller);
  }

  patch(path, controller) {
    this.addRoute("PATCH", path, controller);
  }

  delete(path, controller) {
    this.addRoute("DELETE", path, controller);
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }
}

export default Server;