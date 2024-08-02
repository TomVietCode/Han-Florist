const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

// [GET] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId

  const cart = await Cart.findOne({
    _id: cartId,
  })

  cart.totalPrice = 0
  
  for (const product of cart.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("thumbnail title price discountPercentage")

    productInfo.newPrice =
      ((1 - productInfo.discountPercentage / 100) * productInfo.price).toFixed(0)
    productInfo.totalPrice = productInfo.newPrice * product.quantity
    cart.totalPrice += productInfo.totalPrice
    product.productInfo = productInfo
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán",
    cartDetail: cart,
  })
}
