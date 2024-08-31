// src/Router.js

class Router {
  constructor() {
    this.routes = [];
  }

  addRoute(method, path, ...middlewares) {
    const controller = middlewares.pop(); // O último argumento é sempre o controlador
    this.routes.push({ method, path, middlewares, controller });
  }

  get(path, ...middlewares) {
    this.addRoute('GET', path, ...middlewares);
  }

  post(path, ...middlewares) {
    this.addRoute('POST', path, ...middlewares);
  }

  put(path, ...middlewares) {
    this.addRoute('PUT', path, ...middlewares);
  }

  patch(path, ...middlewares) {
    this.addRoute('PATCH', path, ...middlewares);
  }

  delete(path, ...middlewares) {
    this.addRoute('DELETE', path, ...middlewares);
  }

  findRoute(req) {
    const { method, url } = req;
    const route = this.routes.find(r => {
      const pathRegex = new RegExp(
        "^" + r.path.replace(/\/:([^\/]+)/g, "/([^/]+)") + "$"
      );
      return method === r.method && pathRegex.test(url.split('?')[0]);
    });

    if (route) {
      const pathMatch = url.split('?')[0].match(new RegExp(route.path.replace(/\/:([^\/]+)/g, "/([^/]+)")));
      if (pathMatch) {
        const paramNames = (route.path.match(/\/:([^\/]+)/g) || []).map(p => p.replace("/:",""));
        paramNames.forEach((paramName, index) => {
          req.params[paramName] = pathMatch[index + 1];
        });
      }
    }

    return route;
  }
}

export default Router;
