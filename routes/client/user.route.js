const express = require("express")
const router = express.Router()
const validate = require("../../validates/client/user.validate")

const controller = require("../../helpers/user.controller")

router.get("/register", controller.register)

router.post("/register", validate.requiredFields, controller.registerPost)

router.get("/login", controller.login)

router.post("/login", controller.loginPost)

router.get("/logout", controller.logout)
module.exports = router