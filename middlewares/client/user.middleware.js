const User = require("../../models/user.model")

module.exports.userInfo = async (req, res, next) => {
  if(req.cookies.tokenUser){
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser
    }).select("_id fullName tokenUser")

    if(user){
      res.locals.user = user
    }
  }

  next()
}

module.exports.requireAuth = (req, res, next) => {
  const user = res.locals.user

  if(!user){
    req.flash("error", "Bạn cần đăng nhập để sử dụng tính năng này!")
    res.redirect("/user/login")
  }

  next()
}