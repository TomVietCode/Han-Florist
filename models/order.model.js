const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
  {
    cartId: String,
    userInfo: [
      {
        fullName: String,
        phone: String,
        address: String,
      },
    ],
    products: [
      {
        title: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model(orderSchema, "orders")

module.exports = Order

