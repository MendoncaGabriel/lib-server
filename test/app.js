import Server from "../build/libserver.js"

const app = new Server()

app.use(app.json())


const md = (req, res, next) => {
    console.log("ok")
    next()
}
app.use(md)

app.get("/", md, md, (req, res) => {
    res.end(JSON.stringify({
        teste: "Gabriel"
    }))
})

app.listen(3000, () => {
    console.log("Servidor esta rodando")
})