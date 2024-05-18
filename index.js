const express = require("express")
const dotenv = require("dotenv").config()
const database = require("./config/database.js")

database.connect()

const routesAdmin = require("./routes/admin/index.route")
const routesClient = require("./routes/client/index.route")

const app = express()
const port = process.env.PORT

//Cấu hình pug
app.set("views", "./views")
app.set("view engine", "pug")

//Nhúng file tĩnh
app.use(express.static("public"))

//Routes Admin
routesAdmin(app)

// Routes Client
routesClient(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})