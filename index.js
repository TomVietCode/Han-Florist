const express = require("express");
const dotenv = require("dotenv").config();
const database = require("./config/database.js");
const systemConfig = require("./config/system.js");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const moment = require("moment")
const flash = require("express-flash");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const { createServer } = require("node:http")
const { Server } = require("socket.io")

database.connect();

const routesAdmin = require("./routes/admin/index.route");
const routesClient = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

//Cấu hình pug
app.set("view engine", "pug");
app.set('views', `${__dirname}/views`);

//Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

// Method override (Ghi đè phương thức)
app.use(methodOverride(`_method`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Express Flash (Hiển thị thông báo khi thực hiện một hành động thành công/thất bại)
app.use(cookieParser("ABCDEFGH"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// TinyMce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Socket Io
const server = createServer(app)
const io = new Server(server)

global._io = io

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment

//Routes Admin
routesAdmin(app);

// Routes Client
routesClient(app);

// Not Exist Routes
app.get("*", (req, res) => {
  res.render("client/pages/error/404", {
    pageTitle: "Không tìm thấy trang!"
  })
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
