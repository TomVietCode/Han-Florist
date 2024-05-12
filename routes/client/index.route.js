const homeRoutes = require("./home.route")
const productRoutes = require("./products.route")

module.exports = (app) => {
  app.get("/", homeRoutes);

  app.use("/products", productRoutes);
};
