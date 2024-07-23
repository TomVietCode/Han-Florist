const Category = require("../../models/product-category.model")

const createTreeHelper = require("../../helpers/create-tree.helper")

module.exports.layoutCategory = async (req, res, next) => {
  const layoutCategory = await Category.find({
    status: "active",
    deleted: false
  })

  const layoutCategoryTree = createTreeHelper(layoutCategory)

  res.locals.layoutCategoryTree = layoutCategoryTree

  next()
}