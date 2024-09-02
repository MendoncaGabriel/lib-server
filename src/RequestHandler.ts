import Router from "./Router";
import { INext } from "./types/Next";
import { IRequest } from "./types/Request";
import { IResponse } from "./types/Response";
import { IMiddleware } from "./types/Middleware";

interface IRequestHandler {
  handleRequest(req: IRequest, res: IResponse): Promise<void>;
  parseQueryParams(req: IRequest): { [key: string]: string };
  processRoute(req: IRequest, res: IResponse): void;
}

class RequestHandler implements IRequestHandler {
  private middlewares: IMiddleware[];
  private router: Router;

  constructor(middlewares: IMiddleware[], router: Router) {
    this.middlewares = middlewares;
    this.router = router;
  }

  async handleRequest(req: IRequest, res: IResponse): Promise<void> {
    req.params = {};
    req.query = this.parseQueryParams(req);

    let index = 0;

    // Função para aplicar middlewares globais
    const globalNext = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        index++;
        middleware(req, res, globalNext);
      } else {
        this.processRoute(req, res);
      }
    };

    // Começar a aplicar middlewares
    globalNext();
  }

  parseQueryParams(req: IRequest): { [key: string]: string } {
    const url = req.url ? new URL(req.url, `http://${req.headers.host}`) : new URL('', `http://${req.headers.host}`);
    return Object.fromEntries(url.searchParams.entries());
  }

  processRoute(req: IRequest, res: IResponse): void {
    const route = this.router.find(req);
  
    if (route) {
      let index = 0;
      const routeNext: INext = (err?: any) => {
        if (err) {
          res.statusCode = 500;
          const errorMessage = err instanceof Error ? err.message : 'Unknown Error';
          res.end(`Internal Server Error: ${errorMessage}`);
          return;
        }
  
        if (index < route.middlewares.length) {
          const middleware = route.middlewares[index];
          index++;
          try {
            middleware(req, res, routeNext);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
            res.statusCode = 500;
            res.end(`Internal Server Error: ${errorMessage}`);
          }
        } else {
          if (route.middleware) {
            try {
              route.middleware(req, res, () => {});
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
              res.statusCode = 500;
              res.end(`Internal Server Error: ${errorMessage}`);
            }
          } else {
            res.statusCode = 500;
            res.end("Internal Server Error: No controller provided");
          }
        }
      };
  
      routeNext();
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  }
  
}
  

export default RequestHandler;
