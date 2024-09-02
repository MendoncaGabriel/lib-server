# LibServer

**LibServer** é uma biblioteca minimalista para criação de servidores HTTP em Node.js, oferecendo uma alternativa simplificada ao Express.js, sem dependências externas. É projetada para ser leve e eficiente, facilitando a criação de servidores, o gerenciamento de rotas e middlewares, e o processamento de uploads de arquivos.

## Recursos

- **Servidor HTTP**: Fácil criação de servidores utilizando a biblioteca nativa `http` do Node.js.
- **Middlewares**: Suporte a middlewares globais e específicos para rotas.
- **Rotas Dinâmicas**: Definição de rotas para os principais métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Query Params**: Parse automático de parâmetros de consulta (query strings).
- **Uploads de Arquivos**: Middleware nativo para gerenciamento de uploads.
- **Suporte JSON**: Processamento de requisições e respostas no formato JSON.

## Instalação

Instale a biblioteca através do npm:

```bash
npm install lib-server
```

## Exemplo de Uso

Abaixo, um exemplo básico de como utilizar o `LibServer`:

```javascript
import Server from 'lib-server';

// Cria uma nova instância do servidor
const app = new Server();

// Middleware global para log de requisições
app.use((req, res, next) => {
  console.log(`Método: ${req.method}, Rota: ${req.url}`);
  next();
});

// Rota GET para '/hello'
app.get('/hello', (req, res) => {
  res.end('Olá, Mundo!');
});

// Rota POST com middleware para upload de arquivos
app.post('/upload', app.upload({ /* configurações de upload */ }), (req, res) => {
  res.end('Upload realizado com sucesso!');
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
```

## API

### `use(middleware)`

Adiciona um middleware global que será executado em todas as requisições.

### `json()`

Middleware para processar requisições e respostas no formato JSON.

### `upload(options)`

Middleware para gerenciamento de uploads de arquivos. As opções podem ser configuradas conforme necessário.

### `get(path, ...middlewares)`

Define uma rota para o método HTTP `GET`.

### `post(path, ...middlewares)`

Define uma rota para o método HTTP `POST`.

### `put(path, ...middlewares)`

Define uma rota para o método HTTP `PUT`.

### `patch(path, ...middlewares)`

Define uma rota para o método HTTP `PATCH`.

### `delete(path, ...middlewares)`

Define uma rota para o método HTTP `DELETE`.

### `listen(port, callback)`

Inicia o servidor na porta especificada e executa o callback quando o servidor estiver pronto.

## Contribuição

Contribuições são sempre bem-vindas! Para contribuir, siga os passos abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para sua nova funcionalidade ou correção.
3. Implemente suas mudanças e, se possível, adicione testes.
4. Envie um pull request descrevendo detalhadamente suas alterações.

Repositório oficial: [GitHub - MendoncaGabriel/lib-server](https://github.com/MendoncaGabriel/lib-server)

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Se você encontrar algum problema ou tiver dúvidas, sinta-se à vontade para abrir uma issue no repositório.

Para detalhes sobre os [Testes de Desempenho](./Test.md), clique aqui.