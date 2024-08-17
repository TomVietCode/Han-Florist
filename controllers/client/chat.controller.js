// [GET] /chat
module.exports.index = (req, res) => {
  _io.on("connection", (socket) => {
    console.log("a user connected")
  })

  res.render("client/pages/chat/index", {
    pageTitle: "Trò chuyện"
  })
}