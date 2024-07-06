const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filter-status.helper");

//[GET] /admin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  // Filter Status
  const filterStatus = filterStatusHelper(req.query)

  if(req.query.status){
    find.status = req.query.status
  }
  // End Filter Status

  // Search 
  let keyword = ""
  if(req.query.keyword){
    keyword = req.query.keyword
    const regex = new RegExp(keyword, "i")

    find.title = regex
  }
  // End Search 

  // Sort
  let sort = {}
  if(req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue

    sort[sortKey] = sortValue
  }else{
    sort["position"] = "desc"
  }
  // End Sort

  const records = await ProductCategory.find(find).sort(sort)

  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: records,
    filterStatus: filterStatus,
    keyword: keyword
  });
};

//[GET] /admin/product-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Tạo mới danh mục",
  });
};

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`/${systemConfig.prefixAdmin}/product-category`);
};

// [PATCH] /admin/product-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id
  const status = req.params.status

  await ProductCategory.updateOne({_id: id}, {status: status})

  const categoryInfor = await ProductCategory.findOne({_id: id})
  req.flash('success', `Cập nhật danh mục ${categoryInfor.title} thành công`)

  res.redirect("back")
}

// [DELETE] /admin/product-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id
  if(id){
    await ProductCategory.deleteOne({_id: id})
  }

  req.flash('success', 'Xóa thành công')
  res.redirect("back")
}