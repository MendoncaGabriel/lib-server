import http from "node:http";
import jsonBodyParsin from "./middlewares/json.js"

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
    return jsonBodyParsin
  }

  async handleRequest(req, res) {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        index++;
        middleware(req, res, next);
      } else {
        if (!req.params) {
          req.params = {};
        }

        const route = this.routes.find((r) => {
          // Cria uma expressão regular para capturar parâmetros dinâmicos
          const pathRegex = new RegExp(
            "^" +
              r.path.replace(/\/:([^\/]+)/g, "/([^/]+)") +
              "$"
          );

          // Verifica se a URL da requisição corresponde à expressão regular da rota
          const match = req.url.match(pathRegex);
          if (match) {
            // Captura todos os parâmetros dinâmicos e armazena em req.params
            const paramNames = r.path.match(/\/:([^\/]+)/g);
            if (paramNames) {
              paramNames.forEach((param, index) => {
                const paramName = param.replace("/:","");
                req.params[paramName] = match[index + 1]; // O primeiro item em match é a string completa
              });
            }
            return true;
          }
          return false;
        });

        if (route) {
          route.controller(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
    };

    next();
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