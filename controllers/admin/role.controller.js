const roleModel = require("../../models/role.model")

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await roleModel.find({ deleted: false })

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    records: records,
  })
}
