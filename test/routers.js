// ### Router
import { RootRouter } from "lib-server";

const router = new RootRouter();

// GET route for /test1 with a query parameter
router.get("/test1", (req, res) => {
  const { queryParam } = req.query; // Extracts query parameter from the URL
  console.log(queryParam); // Logs the query parameter
  res.send(`test 1, queryParam: ${queryParam}`);
});

// GET route for /test2 with a dynamic route parameter
router.get("/test2/:name", (req, res) => {
  const { name } = req.params; // Extracts dynamic parameter from the URL
  console.log(name); // Logs the dynamic parameter
  res.send(`test 2, name: ${name}`);
});

// GET route for /test3 with both query and route parameters
router.get("/test3/:id", (req, res) => {
  const { id } = req.params; // Extracts dynamic route parameter
  const { page } = req.query; // Extracts query parameter
  console.log(`ID: ${id}, Page: ${page}`); // Logs both parameters
  res.send(`test 3, id: ${id}, page: ${page}`);
});

// Log the registered routes for debugging
console.log("Registered routes:", router);

export default router;
