import path from "path"; // Module for handling file paths
import { Server } from "lib-server";
import router from "./routers.js";

const app = new Server();

// Middleware to parse JSON payloads
app.use(app.json());

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`Method: ${req.method}, Route: ${req.url}`);
  next();
});

// GET route for /hello
app.get('/hello', (req, res) => {
  res.end('Hello, World!');
});

// File upload configuration
const uploadSettings = { 
  format: ".png", 
  path: path.resolve("storage"), 
  maxFileSize: 1024 * 50 // 50 KB
}

// POST route for file uploads
app.post('/upload', app.upload(uploadSettings), (req, res) => {
  res.end('Upload successful!');
});

// Route for /run using external router
app.root("/run", router);

// GET route for /main
app.get("/main", (req, res) => {
  res.send("main");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export { app };
