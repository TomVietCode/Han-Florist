const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller")
const multer = require("multer")
const validate = require("../../validates/product.validate")

const uploadCloud = require("../../middlewares/uploadCloud.middleware")
const upload = multer()


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
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.createPost
)

router.get("/edit/:id", controller.edit)

router.patch(
  "/edit/:id", 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.editPatch
)

router.get("/detail/:id", controller.detail)

module.exports = router;