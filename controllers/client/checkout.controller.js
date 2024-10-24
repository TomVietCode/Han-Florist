const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Order = require("../../models/order.model")

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

    productInfo.newPrice = Math.round(((1 - productInfo.discountPercentage/100) * productInfo.price))
    productInfo.totalPrice = productInfo.newPrice * product.quantity
    cart.totalPrice += productInfo.totalPrice
    product.productInfo = productInfo
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán",
    cartDetail: cart,
  })
}

// [POST] /checkout/order
module.exports.orderPost = async (req, res) => {
  const cartId = req.cookies.cartId
  if(!req.body.fullName && !req.body.phone && req.body.address) {
    req.flash("error", "Vui lòng nhập đầy đủ thông tin")
    res.redirect("back")
    return
  }
  const userInfo = req.body
  const orderDetail = {
    userInfo: userInfo,
    orderedProducts: []
  }
  const cart = await Cart.findOne({
    _id: cartId
  })

  for (const product of cart.products) {
    const productDetail = await Product.findOne({
      _id: product.product_id
    }).select("title price discountPercentage")
  
    orderDetail.orderedProducts.push({
      title: productDetail.title,
      price: productDetail.price,
      discountPercentage: productDetail.discountPercentage,
      quantity: product.quantity,
      productId: product.product_id,
    })
  }
    
  const order = new Order(orderDetail)
  await order.save()

  await Cart.updateOne({
    _id: cartId
  },{
    products: []
  })

  res.redirect(`/checkout/success/${order.id}`)
}

// [GET] /checkout/success/:orderId
module.exports.orderSuccess = async (req, res) => {
  const orderId = req.params.orderId;

  const order = await Order.findOne({
    _id: orderId
  });

  let totalPrice = 0;

  for (const item of order.orderedProducts) {
    const productInfo = await Product.findOne({
      _id: item.productId
    });

    item.thumbnail = productInfo.thumbnail;
    item.title = productInfo.title;
    item.priceNew = Math.round(((1 - item.discountPercentage/100) * item.price))
    item.totalPrice = item.priceNew * item.quantity;
    totalPrice += item.totalPrice;
  }

  res.render("client/pages/checkout/order-success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    totalPrice: totalPrice
  });
}