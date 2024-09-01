```markdown
# LibServer

LibServer é uma biblioteca leve para criação de servidores HTTP em Node.js, semelhante ao Express.js, mas com uma implementação simplificada e sem dependências externas. Com ela, você pode criar servidores, adicionar rotas e middlewares, e gerenciar uploads de arquivos de maneira fácil e rápida.

## Recursos

- **Criação de Servidor**: Crie um servidor HTTP usando a biblioteca `http` do Node.js.
- **Middlewares**: Adicione middlewares globais e específicos para cada rota.
- **Rotas**: Defina rotas para diferentes métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Parsing de Query Params**: Parseie parâmetros de query de URLs.
- **Middleware de Upload**: Inclua um middleware para upload de arquivos.
- **Suporte a JSON**: Suporte a requisições e respostas JSON.

## Instalação

Para instalar a biblioteca, utilize o comando npm:

```bash
npm install lib-server
```

## Uso

Aqui está um exemplo básico de como usar a LibServer:

```javascript
import Server from 'lib-server';

// Cria uma instância do servidor
const app = new Server();

// Adiciona um middleware global
app.use((req, res, next) => {
  console.log(`Recebido um ${req.method} na rota ${req.url}`);
  next();
});

// Define uma rota GET
app.get('/hello', (req, res) => {
  res.end('Olá, Mundo!');
});

// Define uma rota POST com middleware específico
app.post('/upload', app.upload({ /* opções de upload */ }), (req, res) => {
  res.end('Arquivo enviado com sucesso!');
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

## Métodos

### `use(middleware)`

Adiciona um middleware global que será executado para todas as requisições.

### `json()`

Retorna um middleware para processar requisições e respostas JSON.

### `upload(options)`

Retorna um middleware para upload de arquivos. Passa as opções de configuração para o middleware de upload.

### `get(path, ...middlewares)`

Define uma rota para o método HTTP GET.

### `post(path, ...middlewares)`

Define uma rota para o método HTTP POST.

### `put(path, ...middlewares)`

Define uma rota para o método HTTP PUT.

### `patch(path, ...middlewares)`

Define uma rota para o método HTTP PATCH.

### `delete(path, ...middlewares)`

Define uma rota para o método HTTP DELETE.

### `listen(port, callback)`

Inicia o servidor na porta especificada e executa o callback quando o servidor estiver pronto.

## Contribuindo

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, por favor, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção.
3. Faça suas alterações e adicione testes, se possível.
4. Envie um pull request descrevendo suas mudanças.

Link do repositório: [https://github.com/MendoncaGabriel/lib-server](https://github.com/MendoncaGabriel/lib-server)

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).

---

Se tiver alguma dúvida ou encontrar algum problema, sinta-se à vontade para abrir uma issue no repositório do GitHub.
```