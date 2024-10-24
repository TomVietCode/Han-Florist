const Product = require("../../models/product.model")

//[GET] /client/home
module.exports.index = async (req, res) => {
  const productsFeature = await Product.find({
    featured: "1",
    status: "active",
    deleted: false,
  })
    .limit(6)
    .sort({ position: "desc" })

  for (let product of productsFeature) {
    product.priceNew = Math.round(((1 - product.discountPercentage/100) * product.price)).toLocaleString();
  }

  const productsNew = await Product.find({
    status: "active",
    deleted: "false",
  })
    .limit(8)
    .sort({ position: "desc" })

  for (const product of productsNew) {
    product.priceNew = Math.round(((1 - product.discountPercentage/100) * product.price)).toLocaleString();
  }
  
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeature: productsFeature,
    productsNew: productsNew,
  })
}
