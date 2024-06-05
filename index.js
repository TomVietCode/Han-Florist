const express = require("express")
const dotenv = require("dotenv").config()
const database = require("./config/database.js")
const systemConfig = require("./config/system.js")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")


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

// Method override (Ghi đè phương thức)
app.use(methodOverride(`_method`))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Routes Admin
routesAdmin(app)

// Routes Client
routesClient(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})