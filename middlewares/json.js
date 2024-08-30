const jsonBodyParsin = async (req, res, next) =>  {
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
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
        res.statusCode = 400;
        res.end("Erro no parse do JSON");
        return;
      }
    }
    next();
};

export default jsonBodyParsin