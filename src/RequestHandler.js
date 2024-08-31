class RequestHandler {
    constructor(middlewares, router) {
      this.middlewares = middlewares;
      this.router = router;
    }
  
    async handleRequest(req, res) {
      let index = 0;
      req.params = {};
      req.query = this.parseQueryParams(req);
  
      const next = () => {
        if (index < this.middlewares.length) {
          const middleware = this.middlewares[index];
          index++;
          middleware(req, res, next);
        } else {
          this.processRoute(req, res);
        }
      };
  
      next();
    }
  
    parseQueryParams(req) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      return Object.fromEntries(url.searchParams.entries());
    }
  
    processRoute(req, res) {
      const route = this.router.findRoute(req);
  
      if (route) {
        route.controller(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
  }
  
  export default RequestHandler;
  