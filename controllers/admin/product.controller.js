const Product = require("../../models/product.model")

//[GET] /admin/product
module.exports.index = async (req, res) => {
  const filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Đang hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ]

  if(req.query.status){
    const index = filterStatus.findIndex(item => item.status == req.query.status)
    filterStatus[index].class = "active"
  }else{
    filterStatus[0].class = "active"
  }

  let find = {
    deleted: false
  }

  if(req.query.status){
    find.status = req.query.status;
  }
  
  const products = await Product.find(find)

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus
  });
};
