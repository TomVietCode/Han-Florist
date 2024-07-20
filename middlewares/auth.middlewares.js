const Account = require("../models/account.model")
const systemConfig = require("../config/system")

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    return
  }

  const user = await Account.findOne({
    token: req.cookies.token,
    status: "active",
    deleted: false,
  })

  if (!user) {
    res.clearCookie("token")
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    return
  }

  next()
}
