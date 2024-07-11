const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await Role.find({ deleted: false })

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    records: records,
  })
}

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Thêm mới nhóm quyền",
  })
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    const record = new Role(req.body)
    await record.save()

    req.flash("success", "Thêm nhóm quyền thành công!")
  } catch (error) {
    req.flash("error", "Thêm nhóm quyền thất bại")
  }

  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
