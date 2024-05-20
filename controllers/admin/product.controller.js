const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filter-status.helper")

//[GET] /admin/product
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

  const products = await Product.find(find)

  // Render to /view/
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  });
};
