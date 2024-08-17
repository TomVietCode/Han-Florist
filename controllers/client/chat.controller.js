const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")

// [GET] /chat
module.exports.index = async (req, res) => {
  const userInfo = res.locals.user

  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (msg) => {
      const message = new Chat({
        userId: userInfo.id,
        content: msg
      })
      await message.save()

      _io.emit("SERVER_RETURN_MESSAGE", {
        id: message.userId,
        name: userInfo.fullName,
        content: message.content
      })
    })
    console.log("a user connected")
  })

  const chats = await Chat.find({})
  for (const message of chats) {
    const userName = await User.findOne({
      _id: message.userId
    }).select("fullName")
    message.fullName = userName.fullName
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Trò chuyện",
    chats: chats
  })
}