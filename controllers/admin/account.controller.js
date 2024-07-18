const Account = require("../../models/account.model")

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({ deleted: false })

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  })
}
