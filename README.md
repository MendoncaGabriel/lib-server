# LibServer

**LibServer** is a minimalist library for creating HTTP servers in Node.js, offering a simplified alternative to Express.js, with no external dependencies. It is designed to be lightweight and efficient, making it easy to create servers, manage routes and middleware, and handle file uploads.

## Features

- **HTTP Server**: Easily create servers using Node.js's native `http` module.
- **Middleware**: Support for both global and route-specific middleware.
- **Dynamic Routing**: Define routes for the main HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Query Params**: Automatic parsing of query string parameters.
- **File Uploads**: Native middleware for handling file uploads.
- **JSON Support**: Process requests and responses in JSON format.

## Installation

Install the library via npm:

```bash
npm install lib-server
```

## Usage Example

Here is a basic example of how to use `LibServer`:

```javascript
import Server from 'lib-server';

const app = new Server();

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, Route: ${req.url}`);
  next();
});

app.get('/hello', (req, res) => {
  res.end('Hello, World!');
});

app.post('/upload', app.upload({ /* upload settings */ }), (req, res) => {
  res.end('Upload successful!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## API

### `use(middleware)`

Adds a global middleware that will be executed for all requests.

### `json()`

Middleware for processing JSON requests and responses.

### `upload(options)`

Middleware for handling file uploads. Options can be configured as needed.

### `get(path, ...middlewares)`

Defines a route for the `GET` HTTP method.

### `post(path, ...middlewares)`

Defines a route for the `POST` HTTP method.

### `put(path, ...middlewares)`

Defines a route for the `PUT` HTTP method.

### `patch(path, ...middlewares)`

Defines a route for the `PATCH` HTTP method.

### `delete(path, ...middlewares)`

Defines a route for the `DELETE` HTTP method.

### `listen(port, callback)`

Starts the server on the specified port and runs the callback once the server is ready.

## Contributing

Contributions are always welcome! To contribute, please follow these steps:

1. Fork this repository.
2. Create a branch for your feature or bug fix.
3. Implement your changes and, if possible, add tests.
4. Submit a pull request describing your changes in detail.

Official repository: [GitHub - MendoncaGabriel/lib-server](https://github.com/MendoncaGabriel/lib-server)

## License

This project is licensed under the [MIT License](LICENSE).

---

If you encounter any issues or have questions, feel free to open an issue on the repository.

For details about [Performance Tests](./Test.md), click here.