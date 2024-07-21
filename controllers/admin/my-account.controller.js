const Account = require("../../models/account.model")
const systemConfig = require("../../config/system")

// [GET] /admin/my-account/
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Thông tin tài khoản"
  })
}

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Chỉnh sửa tài khoản"
  })
}

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  try {
    await Account.updateOne({ _id: res.locals.user.id }, req.body)
    req.flash("success", "Cập nhật tài khoản thành công!")
  } catch (error) {
    req.flash("error", "Cập nhật tài khoản thất bại!")
  }
  res.redirect(`/${systemConfig.prefixAdmin}/my-account`)
}
