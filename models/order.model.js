const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
  {
    cartId: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String,
    },

    orderedProducts: [
      {
        productId: String,
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

const Order = mongoose.model("Order", orderSchema, "orders")

module.exports = Order
