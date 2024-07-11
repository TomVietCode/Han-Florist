const express = require("express")
const router = express.Router()
const validate = require("../../validates/product.validate")
const controller = require("../../controllers/admin/product-category.controller")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create", validate.createPost, controller.createPost)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.delete("/delete/:id", controller.deleteItem)

router.get("/edit/:id", controller.edit)

router.patch("/edit/:id", validate.createPost, controller.editPatch)

module.exports = router