import { RootRouter } from "../build/libserver.js";

const router = new RootRouter();

router.get("/teste1", (req, res) => {
  res.send("teste 1");
});

router.get("/teste2/:nome", (req, res) => {
  const {nome} = req.params
  console.log(nome)
  res.send("teste 2");
});

// Verifica as rotas registradas
console.log("Rotas registradas:", router.routes);

export default router;
