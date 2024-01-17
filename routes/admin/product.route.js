const express = require("express");
const route = express.Router();

const multer = require('multer')

const upload = multer();
const validate = require("../../validates/admin/product.validate")

const uploadCloud = require("../../middlewares/admin/uploadCould.middleware.js");

const productController = require("../../controllers/admin/product.controller");
route.get("/", productController.index);
route.patch("/change-status/:status/:id", productController.changeStatus);
route.patch("/change-multi", productController.changeMulti);
route.delete("/delete/:id", productController.deleteItem);
route.get("/create", productController.create);
route.post("/create", upload.single('thumbnail'),uploadCloud.upload , validate.createPost, productController.createPost);
route.get("/edit/:id", productController.edit)
route.patch("/edit/:id", upload.single('thumbnail'),uploadCloud.upload,validate.createPost, productController.editPatch)
route.get("/detail/:id", productController.detail);

module.exports = route;