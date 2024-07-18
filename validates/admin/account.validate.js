const Account = require("../../models/account.model")

module.exports.createPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng điền họ tên!")
    res.redirect("back")
    return
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng điền email!")
    res.redirect("back")
    return
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!")
    res.redirect("back")
    return
  }

  if (!req.body.password.length < 6) {
    req.flash("error", "Mật khẩu phải nhiều hơn 6 kí tự")
    res.redirect("back")
    return
  }

  const existEmail = await Account.findOne({
    email: req.body.email,
    deleted: false,
  })

  if (existEmail) {
    req.flash("error", `email ${req.body.email} đã tồn tại`)
    res.redirect("back")
    return
  }
  next()
}

module.exports.editPatch = async (req, res, next) => {
  if(!req.body.fullName){
    req.flash("error", "Vui lòng điền đầy đủ họ tên!")
    res.redirect("back")
    return
  }

  if(!req.body.email){
    req.flash("error", "Vui lòng điền email!")
    res.redirect("back")
    return
  }

  const emailExist = await Account.findOne({
    _id: {$ne: req.params.id},
    email: req.body.email,
    deleted: false
  })

  if(emailExist){
    req.flash("error", "Email đã tồn tại!")
    res.redirect("back")
    return
  }

  next()
}