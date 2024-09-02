# Performance Test: lib-server vs Express

This document describes the performance tests conducted to compare `lib-server` with `Express`. The goal was to measure each server's ability to handle a high volume of requests per second (RPS) in a resource-constrained environment.

## Test Environment

The tests were conducted in a Docker environment with the following specifications:

- **Memory**: 1024 MB
- **CPU**: 1 CPU
- **Processor**: Intel Core i3-10100T
- **Container System**: Docker

### Configuration Files

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

## Server Implementations

### Express

```javascript
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(3000, () => console.log("Express running"));
```

### lib-server

```javascript
import Server from "lib-server";
const app = new Server();

app.get("/", (req, res) => {
  res.end("ok");
});

app.listen(3000, () => console.log("lib-server running"));
```

## Load Testing with k6

The load tests were conducted using the [k6](https://k6.io/) tool. The goal was to measure the number of requests per second (RPS) each server could process.

### k6 Test Script

```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 300,
  duration: '1m',
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
    'status is 200': (r) => r.status === 200,
    'response time is less than 200ms': (r) => r.timings.duration < 200,
  });
}
```

## Test Results

### Lib-Server

- **Test 1**: Time: 60s | Requests: 333264 | RPS: 5554
- **Test 2**: Time: 60s | Requests: 303245 | RPS: 5049
- **Test 3**: Time: 60s | Requests: 317220 | RPS: 5284

### Express

- **Test 1**: Time: 60s | Requests: 152639 | RPS: 2541
- **Test 2**: Time: 60s | Requests: 152639 | RPS: 2541
- **Test 3**: Time: 60s | Requests: 155277 | RPS: 2585

## Performance Analysis

Based on the test results, `lib-server` demonstrated significantly better performance compared to `Express`:

- **lib-server** processed an average of 5,296.27 requests per second (RPS).
- **Express** processed an average of 2,556.23 requests per second (RPS).

### Performance Difference

`lib-server` is approximately **107.2%** faster than `Express` in terms of RPS. This means that `lib-server` nearly doubles the performance compared to `Express` in a controlled test environment.

## Conclusion

The tests show that `lib-server` is a highly efficient alternative to `Express`, especially in scenarios where performance is critical. If the goal is to maximize requests per second in resource-limited environments, `lib-server` stands out as a solid option.

---

[README](./README.md)