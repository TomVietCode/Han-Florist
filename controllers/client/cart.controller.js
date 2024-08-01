const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

// [GET] /cart
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId

  const cart = await Cart.findOne({
    _id: cartId,
  })
  let cartTotalPrice = 0
  for (const product of cart.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("thumbnail title price discountPercentage")

    productInfo.discountedPrice = (
      (1 - productInfo.discountPercentage / 100) *
      productInfo.price
    ).toFixed(0)
    product.totalPrice = productInfo.discountedPrice * product.quantity
    cartTotalPrice += product.totalPrice
    product.productInfo = productInfo
  }

  cart.totalPrice = cartTotalPrice

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  })
}

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId
  const cartId = req.cookies.cartId
  const quantity = parseInt(req.body.quantity)

  try {
    const cart = await Cart.findOne({ _id: cartId })
    const productInCart = cart.products.find(
      (item) => item.product_id === productId
    )

    if (productInCart) {
      const newQuantity = productInCart.quantity + quantity

      await Cart.updateOne(
        {
          _id: cartId,
          "products.product_id": productId,
        },
        {
          $set: { "products.$.quantity": newQuantity },
        }
      )
    } else {
      const objectProduct = {
        product_id: productId,
        quantity: quantity,
      }

      await Cart.updateOne(
        {
          _id: cartId,
        },
        {
          $push: { products: objectProduct },
        }
      )
    }
    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")
  } catch (error) {
    req.flash("error", "Không thể thêm sản phẩm vào giỏ hàng!")
  }
  res.redirect("back")
}

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: { products: { product_id: productId } },
    }
  )

  res.redirect("back")
}

// [GET] /cart/update/:productId/:newQuantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const newQuantity = parseInt(req.params.newQuantity)

  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": productId,
    },
    {
      $set: { "products.$.quantity": newQuantity },
    }
  )
  res.redirect("back")
}
