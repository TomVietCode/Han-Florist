const mongoose = require("mongoose")

const cartSchema = mongoose.Schema(
  {
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 1296000, 
    },
  },
)

const Cart = mongoose.model("Cart", cartSchema, "carts")

module.exports = Cart
