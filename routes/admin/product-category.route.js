const express = require("express")
const router = express.Router()

const multer = require("multer")
const uploadCloud = require("../../middlewares/uploadCloud.middleware")
const upload = multer()

const controller = require("../../controllers/admin/product-category.controller")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  controller.createPost
)

module.exports = router