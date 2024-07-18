const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const md5 = require("md5")
const systemConfig = require("../../config/system")
const generateHelper = require("../../helpers/generateRandom.helper")

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({ deleted: false })

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    })
    record.roleTitle = role.title
  }
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

// [PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id
    const status = req.params.status

    await Account.updateOne({ _id: id }, { status: status })

    req.flash("success", "Cập nhật thành công!")
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!")
  }

  res.redirect("back")
}

// [DELETE] /admin/accounts/delete-item/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id

    await Account.updateOne({ _id: id }, { deleted: true })

    req.flash("success", "Xóa tài khoản thành công!")
  } catch (error) {
    req.flash("error", "Xóa tài khoản thất bại!")
  }
  res.redirect("back")
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Account.findOne({ _id: id, deleted: false })
    const roles = await Role.find({ deleted: false })

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Cập nhật tài khoản",
      data: data,
      roles: roles
    })
  } catch (error) {
    req.flash("error", "Không tìm thấy tài khoản!")
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id

    if(req.body.password){
      req.body.password = md5(req.body.password)
    }else{
      delete req.body.password
    }

    await Account.updateOne({ _id: id }, req.body)
    req.flash("success", "Cập nhật tài khoản thành công!")
  } catch (error) {
    req.flash("error", "Cập nhật tài khoản thất bại!")
  }
  
  res.redirect("back")
}