import { IRequest } from "./types/Request";
import { IRoute, IRouter } from "./types/Router";
import { IMiddleware } from "./types/Middleware";
import { IRestMethods } from "./types/RestMethods";

class Router implements IRestMethods, IRouter {
  private routes: IRoute[];
  
  constructor() {
    this.routes = [];
  }

  add(method: string, path: string, middlewares: IMiddleware[]): void { 
    const middleware = middlewares.pop(); 
    this.routes.push({ method, path, middlewares, middleware });
  }

  find(req: IRequest): IRoute | undefined {
    const { method, url, params } = req;

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

  get(path: string, ...middlewares: IMiddleware[]): void {
    this.add('GET', path, middlewares);
  }

  post(path: string, ...middlewares: IMiddleware[]): void {
    this.add('POST', path, middlewares);
  }

  put(path: string, ...middlewares: IMiddleware[]): void {
    this.add('PUT', path, middlewares);
  }

  patch(path: string, ...middlewares: IMiddleware[]): void {
    this.add('PATCH', path, middlewares);
  }

  delete(path: string, ...middlewares: IMiddleware[]): void {
    this.add('DELETE', path, middlewares);
  }
}

export default Router;
