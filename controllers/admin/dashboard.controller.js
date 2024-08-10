const Product = require("../../models/product.model")
const Category = require("../../models/product-category.model")
const AdminAccount = require("../../models/account.model")
const User = require("../../models/user.model")

//[GET] /admin/dashboard
module.exports.index = async (req, res) => {  
  const statistic = {
    product: {
      total: 0,
      active: 0,
      inactive: 0
    },
    category: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    adminAccount: {
      total: 0,
      active: 0,
      inactive: 0
    }, 
    user: {
      total: 0
    }
  }

  // Products
  statistic.product.total = await Product.countDocuments({
    deleted: false
  })
  statistic.product.active = await Product.countDocuments({
    status: "active",
    deleted: false
  })
  statistic.product.inactive = await Product.countDocuments({
    status: "inactive",
    deleted: false
  })

  // Admin Accounts
  statistic.adminAccount.total = await AdminAccount.countDocuments({
    deleted: false
  })
  statistic.adminAccount.active = await AdminAccount.countDocuments({
    status: "active",
    deleted: false
  })
  statistic.adminAccount.inactive = await AdminAccount.countDocuments({
    status: "inactive",
    deleted: false
  })

  // Categories
  statistic.category.total = await Category.countDocuments({
    deleted: false
  })
  statistic.category.active = await Category.countDocuments({
    status: "active",
    deleted: false
  })
  statistic.category.inactive = await Category.countDocuments({
    status: "inactive",
    deleted: false
  })

  // Users
  statistic.user.total = await User.countDocuments({})

  res.render("admin/pages/dashboard/index.pug", {
    pageTitle: "Trang tổng quan",
    statistic: statistic
  });
};