const Cart = require("../../models/cart.model")

module.exports.addPost = async (req, res) => {
  const productId = req.params.productId
  const cartId = req.cookies.cartId
  const quantity = parseInt(req.body.quantity)

  try {
    const cart = await Cart.findOne({ _id: cartId })
    const productInCart = cart.products.find(item => item.product_id === productId)

    if(productInCart){
      const newQuantity = productInCart.quantity + quantity

      await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
      },{
        $set: {"products.$.quantity": newQuantity}
      })
    }else{
      const objectProduct = {
        product_id: productId,
        quantity: quantity
      }

      await Cart.updateOne({
        _id: cartId
      }, {
        $push: {products: objectProduct}
      })
    }
    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")
  } catch (error) {
    req.flash("error", "Không thể thêm sản phẩm vào giỏ hàng!")
  }
  res.redirect("back")
}