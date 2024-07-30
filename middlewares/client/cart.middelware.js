const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {
  if(!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    res.cookie(
      "cartId", 
      cart.id, 
      { 
        expires: new Date(Date.now() + 1296000000)
      });
  }else{
    const cart = await Cart.findOne({ _id: req.cookies.cartId })
    res.locals.totalProducts = cart.products.reduce((total, product) => total + product.quantity, 0) || 0
  }
  next();
}