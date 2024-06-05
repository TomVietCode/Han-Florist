const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filter-status.helper")
const paginationHelper = require("../../helpers/pagination.helper")

//[GET] /admin/products
module.exports.index = async (req, res) => {
  
  // Status Filter
  const filterStatus = filterStatusHelper(req.query)
  // End Status Filter

  let find = {
    deleted: false
  }
  
  if(req.query.status){
    find.status = req.query.status;
  }

  //Search
  let keyword = ""

  if(req.query.keyword){
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

  // Render to /view/
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination
  });
};

// [GET] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id

  await Product.updateOne({
    _id: id
  }, {
    status: status
  })

  res.redirect(`back`)
}