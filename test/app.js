import Server from "../build/libserver.js"

const app = new Server()

app.use(app.json())


const md = (req, res, next) => {
    console.log("ok")
    next()
}
app.use(md)

app.get("/", md, md, (req, res) => {
    res.send(`<p style="color:red;">teste</p>`)
})

app.listen(3000, () => {
    console.log("Servidor esta rodando")
})