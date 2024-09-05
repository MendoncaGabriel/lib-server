// Router.ts
import { IRequest } from "./types/Request";
import { IRoute, IRouter } from "./types/Router";
import { IMiddleware } from "./types/Middleware";
import { IRestMethods } from "./types/RestMethods";

class Router implements IRestMethods, IRouter {
  private routes: IRoute[];

  constructor() {
    this.routes = [];
  }

  addMiddleware(method: string, path: string, middlewares: IMiddleware[]): void { 
    this.routes.push({ 
      method, 
      path, 
      middlewares, 
      middleware: middlewares[middlewares.length - 1] // Último middleware é o principal
    });
  }

  addRouterWithPrefix(prefix: string, router: Router): void {
    if (router.routes && Array.isArray(router.routes)) {
        router.routes.forEach(route => {
            this.routes.push({
                method: route.method,
                path: prefix + route.path,
                middlewares: route.middlewares,
                middleware: route.middleware,
            });
        });
    } else {
        // Lidar com o caso em que router.routes está indefinido ou não é um array
        console.error("Router passado não possui rotas definidas.");
    }
}


  find(req: IRequest): IRoute | undefined {
    const { method, url } = req;

    if (!url) return undefined;

    const route = this.routes.find(r => {
      const pathRegex = new RegExp("^" + r.path.replace(/\/:([^\/]+)/g, "/([^/]+)") + "$");
      return method === r.method && pathRegex.test(url.split('?')[0]);
    });

    if (route) {
      const pathMatch = url.split('?')[0].match(new RegExp(route.path.replace(/\/:([^\/]+)/g, "/([^/]+)")));

      if (pathMatch) {
        const paramNames = (route.path.match(/\/:([^\/]+)/g) || []).map(p => p.replace("/:", ""));
        req.params = req.params || {}; 
        
        paramNames.forEach((paramName, index) => {
          req.params![paramName] = pathMatch[index + 1];
        });
      }
    }

    return route;
  }

  // Métodos HTTP padrão (get, post, etc.)
  get(path: string, ...middlewares: IMiddleware[]): void {
    this.addMiddleware("GET", path, middlewares);
  }

  post(path: string, ...middlewares: IMiddleware[]): void {
    this.addMiddleware("POST", path, middlewares);
  }

  put(path: string, ...middlewares: IMiddleware[]): void {
    this.addMiddleware("PUT", path, middlewares);
  }

  patch(path: string, ...middlewares: IMiddleware[]): void {
    this.addMiddleware("PATCH", path, middlewares);
  }

  delete(path: string, ...middlewares: IMiddleware[]): void {
    this.addMiddleware("DELETE", path, middlewares);
  }
}

export default Router;
