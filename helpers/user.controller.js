const User = require("../models/user.model")
const md5 = require("md5")

const generateHelper = require("./generateRandom.helper")

// [GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản"
  })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  req.body.password = md5(req.body.password)

  const userInfo = req.body
  userInfo.tokenUser = generateHelper.generateRandomString(20)

  const user = new User(userInfo)
  user.save()

  res.cookie("tokenUser", userInfo.tokenUser)
  
  req.flash("success", "Đăng ký tài khoản thành công!")
  res.redirect("/")
}

// [GET] /user/login
module.exports.login = (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập"
  })
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  })

  if(!user){
    req.flash("error", "Sai tài khoản hoặc mật khẩu!")
    res.redirect("back")
    return
  }
  if(md5(req.body.password) !== user.password){
    req.flash("error", "Sai tài khoản hoặc mật khẩu!")
    res.redirect("back")
    return
  }

  res.cookie("tokenUser", user.tokenUser)

  res.redirect("/")
}

// [GET] /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser")
  res.redirect("/")
}