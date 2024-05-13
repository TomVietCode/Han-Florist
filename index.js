const express = require("express")
const route = require("./routes/client/index.route.js")
const dotenv = require("dotenv").config()

const app = express()
const port = process.env.PORT

//Cấu hình pug
app.set("views", "./views")
app.set("view engine", "pug")

//Nhúng file tĩnh
app.use(express.static("public"))

//Routes
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})