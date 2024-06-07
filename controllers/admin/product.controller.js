const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filter-status.helper");
const paginationHelper = require("../../helpers/pagination.helper");

//[GET] /admin/products
module.exports.index = async (req, res) => {
  // Status Filter
  const filterStatus = filterStatusHelper(req.query);
  // End Status Filter

  let find = {
    deleted: false,
  };

  let findDeleted = {
    deleted: true,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Count Deleted
  const countDeleted = (await Product.find(findDeleted)).length
  // End Count Deleted

  //Search
  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;

    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }
  //End Search

  // Pagination
  const countProducts = await Product.countDocuments(find);
  const objectPagination = paginationHelper(req.query, 4, countProducts);
  // End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    .sort({position: "desc"})

  // Render to /view/
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    countDeleted: countDeleted,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id, } , {status: status, });

  res.redirect(`back`);
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  let ids = req.body.ids
  ids = ids.split(", ")
  
  switch (type) {
    case "active":
      await Product.updateMany({ '_id': ids }, { 'status': type })
      break;
    case "inactive":
      await Product.updateMany({ '_id': ids }, { 'status': type })
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-")
        position = parseInt(position)

        await Product.updateOne( { '_id': id }, { 'position': position } )
      }
      break;
    case "delete-all":
      await Product.updateMany({ '_id': ids }, { 'deleted': true })
      break;
    default:
      break;
  }

  res.redirect('back')
};

// [DELETE] /admin/products/delete-item/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, {deleted: true});

  res.redirect(`back`);
};

//[GET] /admin/products/recyce-bin
module.exports.recycleBin = async (req, res) => {
  let find = {
    deleted: true,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  //Search
  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;

    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }
  //End Search

  // Pagination
  const countProducts = await Product.countDocuments(find);
  const objectPagination = paginationHelper(req.query, 4, countProducts);
  // End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  // Render to /view/
  res.render("admin/pages/products/recycle-bin.pug", {
    pageTitle: "Thùng rác",
    products: products,
    keyword: keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/recycle-bin/recycle-item/:id
module.exports.recycleItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, {deleted: false});

  res.redirect(`back`);
};