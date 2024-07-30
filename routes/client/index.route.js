const homeRoutes = require("./home.route")
const productRoutes = require("./products.route")
const searchRoutes = require("./search.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")

module.exports = (app) => {
  app.use(categoryMiddleware.layoutCategory)

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/search", searchRoutes); 
};
