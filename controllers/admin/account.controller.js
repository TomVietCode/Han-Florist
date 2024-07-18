const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const md5 = require("md5")
const systemConfig = require("../../config/system")
const generateHelper = require("../../helpers/generateRandom.helper")
// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({ deleted: false })

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false })

  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  })
}
// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.token = generateHelper.generateRandomString(20)
  req.body.password = md5(req.body.password)

  const record = new Account(req.body)
  record.save()

  req.flash("success", "Tạo tài khoản thành công")
  res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}
