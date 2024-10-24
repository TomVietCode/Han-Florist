const Product = require("../../models/product.model")
const Category = require("../../models/product-category.model")

// [GET] /client/products/
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: "false",
  }).sort({ position: "desc" })

  const newProducts = products.map((item) => {
    item.priceNew = Math.round(((1 - item.discountPercentage/100) * item.price)).toLocaleString()
    return item
  })

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  })
}

// [GET] /client/products/detail/:slug
module.exports.detail = async (req, res) => {
  const find = {
    slug: req.params.slug,
    deleted: false,
    status: "active",
  }

  try {
    const product = await Product.findOne(find)
    product.priceNew = Math.round(((1 - product.discountPercentage/100) * product.price)).toLocaleString()

    const relatedProduct = await Product.find({
      _id: {$ne: product.id},
      categoryId: product.categoryId,
      deleted: false,
      status: "active"
    }).limit(4)

    let newProducts = []
    if(relatedProduct.length > 0){
      newProducts = relatedProduct.map((item) => {
        item.priceNew = Math.round(((1 - item.discountPercentage/100) * item.price)).toLocaleString()
        return item
      })
    }

    res.render("client/pages/products/detail.pug", {
      pageTitle: `${product.title}`,
      product: product,
      relatedProduct: newProducts
    })
  } catch (error) {
    console.log(error)
    res.redirect("back")
  }
}

// [GET] /client/products/:slugCategory
module.exports.slugCategory = async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false,
  })

  const getSubCategory = async (parent_id) => {
    let allSub = []

    const listSub = await Category.find({
      parent_id: parent_id,
      status: "active",
      deleted: false,
    })

    allSub = [...listSub]

    for (const sub of listSub) {
      const child = getSubCategory(sub.id)
      allSub = allSub.concat(child)
    }
    return allSub
  }

  const listSubCategory = await getSubCategory(category.id)
  const listSubCategoryId = listSubCategory.map((item) => item.id)

  const products = await Product.find({
    categoryId: { $in: [category.id, ...listSubCategoryId] },
    status: "active",
    deleted: false,
  })

  res.render("client/pages/products/index", {
    title: category.title,
    products: products,
  })
}
