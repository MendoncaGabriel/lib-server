class Router {
    constructor() {
      this.routes = [];
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
  
    findRoute(req) {
      return this.routes.find((r) => {
        const pathRegex = new RegExp(
          "^" + r.path.replace(/\/:([^\/]+)/g, "/([^/]+)") + "$"
        );
        const match = req.url.split("?")[0].match(pathRegex);
        if (match) {
          const paramNames = r.path.match(/\/:([^\/]+)/g);
          if (paramNames) {
            paramNames.forEach((param, index) => {
              const paramName = param.replace("/:","");
              req.params[paramName] = match[index + 1];
            });
          }
          return r.method === req.method;
        }
        return false;
      });
    }
  }
  
  export default Router;
  