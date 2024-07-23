const Product = require("../../models/product.model")

//[GET] /client/home
module.exports.index = async (req, res) => {
  const productsFeature = await Product.find({
    featured: "1",
    status: "active",
    deleted: false,
  })
    .limit(5)
    .sort({ position: "desc" })

  for (let product of productsFeature) {
    product.priceNew = (product.price - (100 * product.discountPercentage)/100).toFixed(0)
  }
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeature: productsFeature,
  })
}
