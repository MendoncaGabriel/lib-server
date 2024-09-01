// src/RequestHandler.ts
var RequestHandler = class {
  middlewares;
  router;
  constructor(middlewares, router) {
    this.middlewares = middlewares;
    this.router = router;
  }
  async handleRequest(req, res) {
    req.params = {};
    req.query = this.parseQueryParams(req);
    let index = 0;
    const globalNext = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        index++;
        middleware(req, res, globalNext);
      } else {
        this.processRoute(req, res);
      }
    };
    globalNext();
  }
  parseQueryParams(req) {
    const url = req.url ? new URL(req.url, `http://${req.headers.host}`) : new URL("", `http://${req.headers.host}`);
    return Object.fromEntries(url.searchParams.entries());
  }
  processRoute(req, res) {
    const route = this.router.findRoute(req);
    if (route) {
      let index = 0;
      const routeNext = (err) => {
        if (err) {
          res.statusCode = 500;
          const errorMessage = err instanceof Error ? err.message : "Unknown Error";
          res.end(`Internal Server Error: ${errorMessage}`);
          return;
        }
        if (index < route.middlewares.length) {
          const middleware = route.middlewares[index];
          index++;
          try {
            middleware(req, res, routeNext);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown Error";
            res.statusCode = 500;
            res.end(`Internal Server Error: ${errorMessage}`);
          }
        } else {
          if (route.middleware) {
            try {
              route.middleware(req, res, () => {
              });
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "Unknown Error";
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
};
var RequestHandler_default = RequestHandler;

export {
  RequestHandler_default
};
//# sourceMappingURL=chunk-F6JZIMTF.js.map