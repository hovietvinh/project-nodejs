const express = require("express");
const route = express.Router();
const multer = require('multer')
const upload = multer();

const validate = require("../../validates/admin/product-category.validate")

const uploadCloud = require("../../middlewares/admin/uploadCould.middleware.js");

const Controller = require("../../controllers/admin/product-category.controller");
// const { validate } = require("../../models/Product.model");

route.get("/",Controller.index)
route.get("/create",Controller.create);

route.post("/create",upload.single("thumbnail"),uploadCloud.upload, validate.createPost,Controller.createPost);


module.exports = route;