const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filter-status.helper")
const createTreeHelper = require("../../helpers/create-tree.helper")

//[GET] /admin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  }

  // Filter Status
  const filterStatus = filterStatusHelper(req.query)

  if (req.query.status) {
    find.status = req.query.status
  }
  // End Filter Status

  // Search
  let keyword = ""
  if (req.query.keyword) {
    keyword = req.query.keyword
    const regex = new RegExp(keyword, "i")

    find.title = regex
  }
  // End Search

  // Sort
  let sort = {}
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue

    sort[sortKey] = sortValue
  }
  // End Sort

  const records = await ProductCategory.find(find).sort(sort)
  const newRecord = createTreeHelper(records)

  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecord,
    filterStatus: filterStatus,
    keyword: keyword,
  })
}

//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  }

  const records = await ProductCategory.find(find)

  const newRecord = createTreeHelper(records)

  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Tạo mới danh mục",
    records: newRecord,
  })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  try {
    if (req.body.position) {
      req.body.position = parseInt(req.body.position)
    } else {
      const count = await ProductCategory.countDocuments()
      req.body.position = count + 1
    }

    const record = new ProductCategory(req.body)
    await record.save()
    req.flash("success", "Tạo mới danh mục thành công!")
  } catch (error) {
    req.flash("error", "Tạo mới danh mục thất bại!")
  }
  res.redirect(`/${systemConfig.prefixAdmin}/product-category`)
}

// [PATCH] /admin/product-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id
  const status = req.params.status

  await ProductCategory.updateOne({ _id: id }, { status: status })

  const categoryInfor = await ProductCategory.findOne({ _id: id })
  req.flash("success", `Cập nhật danh mục ${categoryInfor.title} thành công`)

  res.redirect("back")
}

// [DELETE] /admin/product-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id
  if (id) {
    await ProductCategory.deleteOne({ _id: id })
  }

  req.flash("success", "Xóa thành công")
  res.redirect("back")
}

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id

    const find = {
      _id: id,
      deleted: false,
    }
    const data = await ProductCategory.findOne(find)
    const records = await ProductCategory.find({ deleted: false })
    const treeRecords = createTreeHelper(records)

    res.render("admin/pages/product-category/edit.pug", {
      pageTitle: "Chỉnh sửa danh mục",
      data: data,
      records: treeRecords,
    })
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/product-category`)
  }
}

// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id

  req.body.position = parseInt(req.body.position)
  try {
    console.log(req.body)
    await ProductCategory.updateOne({ _id: id, deleted: false }, req.body)
    req.flash("success", "Cập nhật thành công")
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!")
  }
  res.redirect("back")
}
