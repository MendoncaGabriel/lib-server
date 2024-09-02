// src/Router.ts
var Router = class {
  routes;
  constructor() {
    this.routes = [];
  }
  add(method, path, middlewares) {
    const middleware = middlewares.pop();
    this.routes.push({ method, path, middlewares, middleware });
  }
  find(req) {
    const { method, url, params } = req;
    if (!url) return void 0;
    const route = this.routes.find((r) => {
      const pathRegex = new RegExp("^" + r.path.replace(/\/:([^\/]+)/g, "/([^/]+)") + "$");
      return method === r.method && pathRegex.test(url.split("?")[0]);
    });
    if (route) {
      const pathMatch = url.split("?")[0].match(new RegExp(route.path.replace(/\/:([^\/]+)/g, "/([^/]+)")));
      if (pathMatch) {
        const paramNames = (route.path.match(/\/:([^\/]+)/g) || []).map((p) => p.replace("/:", ""));
        req.params = req.params || {};
        paramNames.forEach((paramName, index) => {
          req.params[paramName] = pathMatch[index + 1];
        });
      }
    }
    return route;
  }
  // Métodos REST para adicionar rotas com diferentes métodos HTTP
  get(path, ...middlewares) {
    this.add("GET", path, middlewares);
  }
  post(path, ...middlewares) {
    this.add("POST", path, middlewares);
  }
  put(path, ...middlewares) {
    this.add("PUT", path, middlewares);
  }
  patch(path, ...middlewares) {
    this.add("PATCH", path, middlewares);
  }
  delete(path, ...middlewares) {
    this.add("DELETE", path, middlewares);
  }
};
var Router_default = Router;

export {
  Router_default
};
//# sourceMappingURL=chunk-6JXX667Y.js.map