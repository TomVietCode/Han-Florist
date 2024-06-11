const Product = require("../../models/product.model");

// [GET] /client/products/
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: "false",
  }).sort({ position: "desc" });

  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

// [GET] /client/products/:slug
module.exports.detail = async (req, res) => {
  const find = {
    slug: req.params.slug,
    deleted: false
  }

  const product = await Product.findOne(find)
  
  res.render("client/pages/products/detail.pug", {
    pageTitle: `${product.title}`,
    product: product
  })
}