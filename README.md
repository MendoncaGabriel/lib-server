# LIBSERVER

```markdown

Uma biblioteca simples de servidor HTTP para Node.js, que permite adicionar middlewares e rotas com suporte ao parsing de JSON.

## Instalação

Para instalar esta biblioteca, você pode usar o npm:

```bash
npm install lib-server
```

## Como Usar

### Importando e Iniciando o Servidor

```javascript
import Server from "lib-server";

const app = new Server();

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

### Middlewares

Você pode adicionar middlewares com o método `use`. Por exemplo, para adicionar um middleware para parsear JSON:

```javascript
app.use(app.json());
```

### Rotas

A biblioteca permite definir rotas HTTP para os métodos `GET`, `POST`, `PUT`, `PATCH` e `DELETE`. 

Exemplo de uso com `GET` e `POST`:

```javascript
// Rota GET
app.get("/", (req, res) => {
  res.end("Bem-vindo à API!");
});

// Rota POST
app.post("/dados", (req, res) => {
  const dados = req.body;
  console.log(dados);
  res.end("Dados recebidos");
});
```

### Exemplo Completo

Aqui está um exemplo completo de como usar a biblioteca para criar um servidor básico:

```javascript
import Server from "lib-server";

const app = new Server();

// Middleware para parsear JSON
app.use(app.json());

// Rota GET
app.get("/", (req, res) => {
  res.end("Bem-vindo à API!");
});

// Rota POST para receber dados JSON
app.post("/dados", (req, res) => {
  const dados = req.body;
  console.log(dados);
  res.end("Dados recebidos");
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

### Próximos Passos

- Adicionar mais middlewares personalizados conforme a necessidade.
- Expandir o suporte para mais funcionalidades, como autenticação, validação de dados, etc.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
