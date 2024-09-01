// src/middlewares/json.ts
var jsonBodyParsin = async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    if (req.headers["content-type"]?.startsWith("application/json")) {
      try {
        req.body = await new Promise((resolve, reject) => {
          let bodyString = "";
          req.on("data", (chunk) => {
            bodyString += chunk.toString();
          });
          req.on("end", () => {
            try {
              resolve(JSON.parse(bodyString));
            } catch (error) {
              reject(error);
            }
          });
          req.on("error", (err) => {
            reject(err);
          });
        });
      } catch (error) {
        if (error instanceof Error) {
          res.statusCode = 400;
          res.end(`Erro no parse do JSON: ${error.message}`);
        } else {
          res.statusCode = 400;
          res.end("Erro desconhecido no parse do JSON");
        }
        return;
      }
    }
  }
  next();
};
var json_default = jsonBodyParsin;

export {
  json_default
};
//# sourceMappingURL=chunk-3HE3VHYW.js.map