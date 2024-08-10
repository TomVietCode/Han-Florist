const Cart = require("../../models/cart.model")

module.exports.cart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart({
      expireAt: Date.now() + 60 * 60 * 24 * 1000,
    })
    await cart.save()

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    })

    res.locals.totalProducts = cart.products.reduce(
      (total, product) => total + product.quantity,
      0
    )
  }
  next()
}
