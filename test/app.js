import Server from "../build/libserver.js"

const app = new Server()

app.use(app.json())

app.get("/", (req, res) => {
    res.send({
        teste: "Gabriel"
    })
})

app.listen(3000, () => {
    console.log("Servidor esta rodando")
})