// src/RequestHandler.js

class RequestHandler {
  constructor(middlewares, router) {
    this.middlewares = middlewares;
    this.router = router;
  }

  async handleRequest(req, res) {
    req.params = {};
    req.query = this.parseQueryParams(req);

    let index = 0;

    // Aplicar middlewares globais
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
    const url = new URL(req.url, `http://${req.headers.host}`);
    return Object.fromEntries(url.searchParams.entries());
  }

  processRoute(req, res) {
    const route = this.router.findRoute(req);

    if (route) {
      let index = 0;
      const routeNext = () => {
        if (index < route.middlewares.length) {
          const middleware = route.middlewares[index];
          index++;
          middleware(req, res, routeNext);
        } else {
          route.controller(req, res);
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
