const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller")
const multer = require("multer")
const validate = require("../../validates/product.validate")

const storageUpload = require("../../helpers/storageUpload.helper")
const upload = multer({ storage: storageUpload() })

router.get("/", controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete-item/:id", controller.deleteItem)

router.get("/recycle-bin", controller.recycleBin)

router.patch("/recycle-bin/recycle-item/:id", controller.recycleItem)

router.delete("/recycle-bin/delete-permanently/:id", controller.deletePermanently)

router.get("/create", controller.create)

router.post(
  "/create", 
  upload.single('thumbnail'), 
  validate.createPost,
  controller.createPost
)

module.exports = router;