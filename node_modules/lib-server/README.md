# LibServer - Simple HTTP Server Library

Uma biblioteca simples e leve para criar servidores HTTP em Node.js, com suporte para controladores assíncronos. Ideal para quem deseja uma solução rápida e flexível para lidar com diferentes métodos HTTP e rotas.

## Funcionalidades

- **Múltiplos Métodos HTTP**: Suporte para GET, POST, PUT, PATCH e DELETE.
- **Controladores Assíncronos**: Permite utilizar controladores assíncronos (async/await) para operações de I/O, como acesso a bancos de dados.
- **Facilidade de Uso**: Estrutura simples e intuitiva, com configuração mínima necessária.

## Instalação

Primeiro, instale o Node.js se ainda não tiver instalado. Em seguida, basta incluir o código desta biblioteca no seu projeto.

## Exemplo de Uso

Aqui está um exemplo de como usar a biblioteca para criar um servidor HTTP:

```javascript
import Server from './Server';  // Ajuste o caminho conforme necessário

const app = new Server();

// Definindo uma rota GET
app.get("/teste", (req, res) => {
  res.end("ok");
});

// Iniciando o servidor na porta 3333
app.listen(3333, () => console.log("🚀 Servidor rodando na porta 3333"));
