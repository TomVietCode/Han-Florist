const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/product.controller")

router.get("/", controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete-item/:id", controller.deleteItem)

router.get("/recycle-bin", controller.recycleBin)

router.patch("/recycle-bin/recycle-item/:id", controller.recycleItem)

router.get("/create", controller.create)

router.post("/create", controller.createPost)

module.exports = router;