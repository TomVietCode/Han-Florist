const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgot-password.model")
const md5 = require("md5")

const generateHelper = require("../../helpers/generateRandom.helper")
const sendEmailHelper = require("../../helpers/sendMail.helper")
// [GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
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
    pageTitle: "Đăng nhập",
  })
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  })

  if (!user) {
    req.flash("error", "Sai tài khoản hoặc mật khẩu!")
    res.redirect("back")
    return
  }
  if (md5(req.body.password) !== user.password) {
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

// [GET] /user/forgot-password
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Quên mật khẩu",
  })
}

// [POST] /user/forgot-password
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email

  const existEmail = await User.findOne({
    email: email,
  })

  if (!existEmail) {
    req.flash("error", "Email Không tồn tại!")
    res.redirect("back")
    return
  }

  const objectForgotPassword = new ForgotPassword({
    email: email,
    otp: generateHelper.generateRandomNumber(6),
    expireAt: Date.now() + 2 * 60 * 1000,
  })

  await objectForgotPassword.save()

  // Send email with Nodemailer
  const subject = "[TMY SHOP] Mã xác nhận OTP"
  const html = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">TMY SHOP</a>
          </div>
          <p style="font-size:1.1em">Xin chào ${existEmail.fullName},</p>
          <p>Dưới đây là mã OTP xác thực để đổi mật khẩu. Vui lòng không chia sẻ cho bất kỳ ai. Mã OTP có hiệu lực trong 2 phút!</p>
          <h2
              style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
              ${objectForgotPassword.otp}</h2>
          <p style="font-size:0.9em;">Trân trọng,<br />TMY SHOP</p>
          <hr style="border:none;border-top:1px solid #eee" />`
  sendEmailHelper.sendEmail(email, subject, html)

  res.redirect(`/user/otp-password?email=${email}`)
}

// [GET] /user/otp-password
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email

  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  })
}

// [POST] /user/otp-password
module.exports.otpPasswordPost = async (req, res) => {
  const existOTP = await ForgotPassword.findOne({
    email: req.body.email,
    otp: req.body.otp,
  })

  if (!existOTP) {
    req.flash("error", "Mã OTP không đúng!")
    res.redirect("back")
    return
  }

  const user = await User.findOne({
    email: req.body.email,
  })

  res.cookie("tokenUser", user.tokenUser)

  res.redirect("/user/reset-password")
}

// [GET] /user/reset-password
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Reset mật khẩu",
  })
}

// [GET] /user/reset-password
module.exports.resetPasswordPost = async (req, res) => {
  const newPassword = md5(req.body.confirmPassword)

  if (req.cookies.tokenUser) {
    await User.updateOne(
      {
        tokenUser: req.cookies.tokenUser,
      },
      {
        password: newPassword,
      }
    )

    req.flash("success", "Đổi mật khẩu thành công!")
  }
  res.redirect("/")
}
