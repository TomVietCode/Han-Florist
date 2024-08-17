const mongoose = require("mongoose")

const chatSchema = mongoose.Schema(
  {
    userId: String,
    content: String,
    images: Array,
  },
  {
    timestamps: true,
  }
)

const Chat = mongoose.model("Chat", chatSchema, "chats")

module.exports = Chat