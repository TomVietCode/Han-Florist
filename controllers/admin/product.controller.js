const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
const Account = require("../../models/account.model")
const filterStatusHelper = require("../../helpers/filter-status.helper")
const paginationHelper = require("../../helpers/pagination.helper")
const createTreeHelper = require("../../helpers/create-tree.helper")
const flash = require("express-flash")
const systemConfig = require("../../config/system")

//[GET] /admin/products
module.exports.index = async (req, res) => {
  // Status Filter
  const filterStatus = filterStatusHelper(req.query)
  // End Status Filter

  let find = {
    deleted: false,
  }

  let findDeleted = {
    deleted: true,
  }

  if (req.query.status) {
    find.status = req.query.status
  }

  // Count Deleted
  const countDeleted = (await Product.find(findDeleted)).length
  // End Count Deleted

  //Search
  let keyword = ""

  if (req.query.keyword) {
    keyword = req.query.keyword

    const regex = new RegExp(keyword, "i")
    find.title = regex
  }
  //End Search

  // Pagination
  const countProducts = await Product.countDocuments(find)
  const objectPagination = paginationHelper(req.query, 5, countProducts)
  // End Pagination

  // Sort
  let sort = {}
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue

    sort[sortKey] = sortValue
  } else {
    sort["position"] = "desc"
  }
  // End Sort

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    .sort(sort)

  for (const item of products) {
    if(item.createdBy){
      const creator = await Account.findOne({
        _id: item.createdBy
      })

      item.creatorName = creator.fullName
    }else{
      item.creatorName = ""
    }

    if(item.updatedBy){
      const updater = await Account.findOne({
        _id: item.updatedBy
      })
      item.updaterName = updater.fullName
    }else{
      item.updaterName = ""
    }
  }

  // Render to /view/
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    countDeleted: countDeleted,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination,
  })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status
    const id = req.params.id
    const userId = res.locals.user.id
    
    await Product.updateOne({ _id: id }, { status: status, updatedBy: userId })
      
    res.json({
      code: 200,
      message: `Cập nhật sản phẩm thành công!`
    })
  } catch (error) {
    req.flash("error", `Cập nhật sản phẩm thất bại!`)
    res.json({
      code: 400,
      message: `Cập nhật sản phẩm thất bại!`
    })
  }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  let ids = req.body.ids
  ids = ids.split(", ")
  const userId = res.locals.user.id

  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({ _id: ids }, { status: type, updatedBy: userId })
      req.flash("success", "Cập nhật trạng thái thành công!")
      break
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-")
        position = parseInt(position)

        await Product.updateOne({ _id: id }, { position: position, updatedBy: userId })
      }
      req.flash("success", "Đổi vị trí thành công!")
      break
    case "delete-all":
      await Product.updateMany({ _id: ids }, { deleted: true, deletedBy: userId })
      req.flash("success", "Xóa sản phẩm thành công!")
      break
    default:
      break
  }

  res.redirect("back")
}

// [DELETE] /admin/products/delete-item/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id
  const userId = res.locals.user.id

  await Product.updateOne({ _id: id }, { deleted: true, deletedBy: userId })

  req.flash("success", "Xóa sản phẩm thành công!")
  res.redirect(`back`)
}

//[GET] /admin/products/recyce-bin
module.exports.recycleBin = async (req, res) => {
  let find = {
    deleted: true,
  }

  if (req.query.status) {
    find.status = req.query.status
  }

  //Search
  let keyword = ""

  if (req.query.keyword) {
    keyword = req.query.keyword

    const regex = new RegExp(keyword, "i")
    find.title = regex
  }
  //End Search

  // Pagination
  const countProducts = await Product.countDocuments(find)
  const objectPagination = paginationHelper(req.query, 4, countProducts)
  // End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)

  for (const item of products) {
    if(item.deletedBy){
      const deleter = await Account.findOne({ _id: item.deletedBy })

      item.deleterName = deleter.fullName
    }else{
      item.deleterName = ""
    }

  }
  // Render to /view/
  res.render("admin/pages/products/recycle-bin.pug", {
    pageTitle: "Thùng rác",
    products: products,
    keyword: keyword,
    pagination: objectPagination,
  })
}

// [PATCH] /admin/products/recycle-bin/recycle-item/:id
module.exports.recycleItem = async (req, res) => {
  const id = req.params.id

  await Product.updateOne({ _id: id }, { deleted: false })

  req.flash("success", "Khôi phục thành công!")

  res.redirect(`back`)
}

// [DELETE] /admin/products/recycle-bin/delete-permanently/:id
module.exports.deletePermanently = async (req, res) => {
  const id = req.params.id

  await Product.deleteOne({ _id: id })

  req.flash("success", `Xóa thành công!`)
  res.redirect(`back`)
}

module.exports.changeMultiBin = async (req, res) => {
  const type = req.body.type
  let ids = req.body.ids
  ids = ids.split(", ")

  switch (type) {
    case "delete-all":
      await Product.deleteMany({ _id: ids })
      req.flash("success", "Xóa sản phẩm thành công!")
      break;
    case "restore-all":
      await Product.updateMany({_id: ids}, {deleted: false})
      req.flash("success", "Khôi phục sản phẩm thành công!")
    default:
      break;
  }
  
  res.redirect("back")
}
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  const category = await ProductCategory.find({ deleted: false })
  const newCategory = createTreeHelper(category)

  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory,
  })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseFloat(req.body.price)
  req.body.discountPercentage = parseFloat(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.createdBy = res.locals.user.id

  if (req.body.position) {
    req.body.position = parseInt(req.body.position)
  } else {
    const countProduct = await Product.countDocuments()
    req.body.position = countProduct + 1
  }

  console.log(req.body)
  const record = new Product(req.body)
  await record.save()

  req.flash("success", "Thêm mới sản phẩm thành công!")
  res.redirect(`/${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id

  const product = await Product.findOne({
    _id: id,
    deleted: false,
  })

  const category = await ProductCategory.find({ deleted: false })
  const newCategory = createTreeHelper(category)

  res.render("admin/pages/products/edit.pug", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
    category: newCategory,
  })
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id

  req.body.price = parseFloat(req.body.price)
  req.body.discountPercentage = parseFloat(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position = parseInt(req.body.position)
  req.body.updatedBy = res.locals.user.id
  try {
    await Product.updateOne(
      {
        _id: id,
        deleted: false,
      },
      req.body
    )
    req.flash("success", "Cập nhật thành công")
  } catch (error) {
    req.flash("error", "Úi! Có lỗi rồi!")
  }
  res.redirect("back")
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id

  try {
    const product = await Product.findOne({
      _id: id,
      deleted: false,
    })

    res.render("admin/pages/products/detail.pug", {
      pageTitle: `${product.title}`,
      product: product,
    })
  } catch (error) {
    res.redirect("back")
  }
}
