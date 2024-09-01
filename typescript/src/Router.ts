import { IMiddleware } from "./types/Middleware";
import { IRequest } from "./types/Request";
import { IRestMethods } from "./types/RestMethods";
import { IRoute, IRouter } from "./types/Router";


class Router implements IRestMethods, IRouter {
  private routes: IRoute[];

  constructor() {
    this.routes = [];
  }

  
  addRouter(method: string, path: string, middlewares: IMiddleware[]): void { // Adiciona uma rota com método e middlewares
    const middleware = middlewares.pop(); // O último argumento é sempre o controlador
    this.routes.push({ method, path, middlewares, middleware });
  }

  findRoute(req: IRequest): IRoute | undefined {   // Encontra uma rota correspondente com base na requisição
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
        req.params = req.params || {}; // Inicializa params se não estiver definido
        
        paramNames.forEach((paramName, index) => {
          req.params![paramName] = pathMatch[index + 1];
        });
      }
    }

    return route;
  }

  // Métodos REST para adicionar rotas com diferentes métodos HTTP
  get(path: string, ...middlewares: IMiddleware[]): void {
    this.addRouter('GET', path, middlewares);
  }

  post(path: string, ...middlewares: IMiddleware[]): void {
    this.addRouter('POST', path, middlewares);
  }

  put(path: string, ...middlewares: IMiddleware[]): void {
    this.addRouter('PUT', path, middlewares);
  }

  patch(path: string, ...middlewares: IMiddleware[]): void {
    this.addRouter('PATCH', path, middlewares);
  }

  delete(path: string, ...middlewares: IMiddleware[]): void {
    this.addRouter('DELETE', path, middlewares);
  }
}

export default Router;
