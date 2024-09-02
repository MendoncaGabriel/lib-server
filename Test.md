# Teste de Desempenho: lib-server vs Express

Este documento descreve os testes de desempenho realizados para comparar o `lib-server` com o `Express`. O objetivo foi medir a capacidade de cada servidor de lidar com um alto volume de requisições por segundo (RPS) em um ambiente limitado de recursos.

## Ambiente de Teste

Os testes foram realizados em um ambiente Docker com as seguintes especificações:

- **Memória**: 1024 MB
- **CPU**: 1 CPU
- **Processador**: Intel Core i3-10100T
- **Sistema de Contêineres**: Docker

### Arquivos de Configuração

#### `docker-compose.yml`

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    deploy:
      resources:
        limits:
          memory: 1024M
          cpus: '1'
    environment:
      NODE_ENV: production
```

#### `Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Implementação dos Servidores

### Express

```javascript
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(3000, () => console.log("Express rodando"));
```

### lib-server

```javascript
import Server from "lib-server";
const app = new Server();

app.get("/", (req, res) => {
  res.end("ok");
});

app.listen(3000, () => console.log("lib-server rodando"));
```

## Teste de Carga com k6

Os testes de carga foram realizados utilizando a ferramenta [k6](https://k6.io/). O objetivo foi medir o número de requisições por segundo (RPS) que cada servidor consegue processar.

### Script de Teste com k6

```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 300, // Número de usuários virtuais simultâneos
  duration: '1m', // Duração do teste
};

export default function () {
  const url = 'http://localhost:3000/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  let res = http.get(url, params);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta é menor que 200ms': (r) => r.timings.duration < 200,
  });
}
```

## Resultados dos Testes

### lib-server

- **Teste 1**: Tempo: 60s | Requisições: 333,264 | RPS: 5,554.4
- **Teste 2**: Tempo: 60s | Requisições: 303,245 | RPS: 5,049.9
- **Teste 3**: Tempo: 60s | Requisições: 317,220 | RPS: 5,284.5

### Express

- **Teste 1**: Tempo: 60s | Requisições: 152,639 | RPS: 2,541.8
- **Teste 2**: Tempo: 60s | Requisições: 152,639 | RPS: 2,541.8
- **Teste 3**: Tempo: 60s | Requisições: 155,277 | RPS: 2,585.1

## Análise de Desempenho

Com base nos resultados dos testes, o `lib-server` apresentou uma performance significativamente superior ao `Express`:

- **lib-server** processou, em média, 5,296.27 requisições por segundo (RPS).
- **Express** processou, em média, 2,556.23 requisições por segundo (RPS).

### Diferença de Desempenho

O `lib-server` é aproximadamente **107,2%** mais rápido que o `Express` em termos de RPS. Isso significa que o `lib-server` praticamente dobra o desempenho em comparação ao `Express` em um ambiente de teste controlado.

## Conclusão

Os testes mostram que o `lib-server` é uma alternativa altamente eficiente ao `Express`, especialmente em cenários onde a performance é crítica. Se o objetivo é maximizar o número de requisições por segundo em ambientes com recursos limitados, o `lib-server` se apresenta como uma opção sólida.


[README](./README.md)