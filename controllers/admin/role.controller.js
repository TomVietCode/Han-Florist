const Role = require("../../models/role.model")
const Account = require("../../models/account.model")
const systemConfig = require("../../config/system")

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await Role.find({ deleted: false })

  for (let role of records) {
    const countAccount = await Account.countDocuments({ role_id: role.id })
    role["totalAccount"] = countAccount
  }
  console.log(records)
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

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Role.findOne({ _id: id, deleted: false })

    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data,
    })
  } catch (error) {
    req.flash("error", "Không tìm thấy nhóm quyền hợp lệ!")
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id

  try {
    await Role.updateOne({ _id: id }, req.body)
    req.flash("success", "Cập nhật thành công!")
  } catch (error) {
    req.flas("error", "Cập nhật thất bại")
  }
  res.redirect("back")
}

// [DELETE] /admin/roles/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id

  await Role.deleteOne({ _id: id })

  req.flash("success", "Xóa thành công!")
  res.redirect("back")
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  const records = await Role.find({ deleted: false })

  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records,
  })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const datas = JSON.parse(req.body.roles)

  for (const data of datas) {
    await Role.updateOne(
      {
        _id: data.id,
        deleted: false,
      },
      { permissions: data.permissions }
    )
  }

  req.flash("success", "Cập nhật quyền thành công!")

  res.redirect("back")
}
