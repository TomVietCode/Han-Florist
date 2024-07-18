const Account = require("../../models/account.model")
const md5 = require("md5")
const systemConfig = require("../../config/system")
// [GET] /admin/auth/login
module.exports.login = (req, res) => {
  const email = req.cookies.email || ""
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập",
    email: email,
  })
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email
  if (!email) {
    req.flash("error", "Vui lòng nhập email!")
    res.redirect("back")
    return
  }

  const user = await Account.findOne({
    email: email,
    deleted: false,
  })

  if (!user) {
    req.flash("error", "Email không hợp lệ!")
    res.redirect("back")
    return
  }

  res.cookie("email", user.email)

  if (req.body.password) {
    req.body.password = md5(req.body.password)
  } else {
    req.flash("error", "Vui lòng nhập mật khẩu!")
    res.redirect("back")
    return
  }

  if (req.body.password != user.password) {
    req.flash("error", "Sai mật khẩu!")
    res.redirect("back")
    return
  }

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!")
    res.redirect("back")
    return
  }

  res.cookie("token", user.token)
  res.clearCookie("email")
  res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token")
  res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}