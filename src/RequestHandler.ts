import Router from "./Router";
import { IRequest } from "./types/Request";
import { IResponse } from "./types/Response";
import { IMiddleware } from "./types/Middleware";
import { QueryParams } from "./utils/parseQueryParams";
import { ProcessRouter } from "./utils/processRouter";

interface IRequestHandler {
  handleRequest(req: IRequest, res: IResponse): Promise<void>;
}



class RequestHandler implements IRequestHandler {
  constructor(
    private middlewares: IMiddleware[],
    private router: Router,
    private queryParams = new QueryParams(),
    private processRouter = new ProcessRouter()
  ) { }

  async handleRequest(req: IRequest, res: IResponse): Promise<void> {
    req.params = {};
    req.query = this.queryParams.parse(req);

    // Função para aplicar middlewares globais de forma assíncrona
    for (const middleware of this.middlewares) {
      await new Promise<void>((resolve, reject) => {
        middleware(req, res, (err?: any) => (
          err ? reject(err) : resolve()
        ));
      });
    }
  
    // middleware de callback controller
    await this.processRouter.process(req, res, this.router);
  }

}


export default RequestHandler;
