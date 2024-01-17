const systemConfig = require("../../config/systems")
const dashboardRoute = require("./dashboard.route")
const productsRoute = require("./product.route");
const productsCategoryRoute = require("./product-category.route");
const { prefixAdmin } = require("../../config/systems");
module.exports = (app)=>{
    const pathAdmin = systemConfig.prefixAdmin;
    app.use(`${pathAdmin}/dashboard`,dashboardRoute);
    app.use(`${pathAdmin}/products`,productsRoute);

    app.use(`${prefixAdmin}/products-category`,productsCategoryRoute);
}

