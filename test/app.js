import { Server } from "../build/libserver.js";
import router from "./routers.js";

const app = new Server();

app.use(app.json());

app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  next();
});



app.root("/run", router); // Adiciona o router com prefixo
app.get("/main", (req, res) => {
  res.send("main");
});
app.listen(3000, () => {
  console.log("Servidor está rodando");
});
export { app };
