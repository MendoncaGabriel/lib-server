import Server from "./libserver.js";
const app = new Server();


app.use(app.json())

app.use((req, res, next) => {
    console.log(req.body)
    next()
})


app.post("/", async (req, res) => {
    const json = req.body;
    res.end(JSON.stringify(json));
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
