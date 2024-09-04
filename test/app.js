import Server from "../build/libserver.js"
import path from "path"

const app = new Server()
app.use(app.json())

app.get("/", (req, res) => {
    // res.send("Gabriel")
    // res.send({nome: "Gabriel"})
    // res.send(path.resolve("public", "img.webp"))
    res.send(path.resolve("public", "video.mp4"))
    // res.send(`<p style="color:red;">teste</p>`)
})

app.listen(3000, () => {
    console.log("Servidor esta rodando")
})