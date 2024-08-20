const express = require("express")
const router = express.Router()
const validate = require("../../validates/client/user.validate")

const controller = require("../../controllers/client/user.controller")

const userMiddleware = require("../../middlewares/client/user.middleware")

router.get("/register", controller.register)

router.post("/register", validate.requiredFields, controller.registerPost)

router.get("/login", controller.login)

router.post("/login", controller.loginPost)

router.get("/logout", controller.logout)

router.get("/forgot-password", controller.forgotPassword)

router.post("/forgot-password", controller.forgotPasswordPost)

router.get("/otp-password", controller.otpPassword)

router.post("/otp-password", controller.otpPasswordPost)

router.get("/reset-password", userMiddleware.requireAuth, controller.resetPassword)

router.post("/reset-password", controller.resetPasswordPatch)

router.get("/profile", userMiddleware.requireAuth, controller.profile)

module.exports = router