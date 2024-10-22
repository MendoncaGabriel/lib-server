import Router from "../Router";
import { IRequest } from "../types/Request";
import { IResponse } from "../types/Response";

export class ProcessRouter {

    async process(req: IRequest, res: IResponse, router: Router): Promise<void> {
        const route = router.find(req);

        if (!route) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }


        try {
            for (const middleware of route.middlewares) {
                await new Promise<void>((resolve, reject) => {
                    // execução do middleware callback controller
                    middleware(req, res, (err?: any) => (
                        err ? reject(err) : resolve()
                    ));
                });
            }
            
            if (route.middleware) {
                route.middleware(req, res, () => {});
            } else {
                res.statusCode = 500;
                res.end("Internal Server Error: No controller provided");
            }
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
            res.statusCode = 500;
            res.end(`Internal Server Error: ${errorMessage}`);
        }

    }
}
