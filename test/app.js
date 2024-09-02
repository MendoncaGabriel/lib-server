import Server from "../build//libserver.js"

const app = new Server()

app.get("/", (req, res) => {
    console.log(res)
    app.send("oh")
})

app.listen(3000, () => {
    console.log("Servidor esta rodando")

})