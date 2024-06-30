const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")

//[GET] /admin/product-category
module.exports.index = (req, res) => {
  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm"
  })
}

//[GET] /admin/product-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Tạo mới danh mục"
  })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position){
    req.body.position = parseInt(req.body.position)
  }else{
    const count = await ProductCategory.countDocuments()
    req.body.position = count + 1
  }

  const record = new ProductCategory(req.body)
  await record.save()

  res.redirect(`/${systemConfig.prefixAdmin}/product-category`)
}