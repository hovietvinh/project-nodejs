const express = require("express");
const route = express.Router();
const homeController = require("../../controllers/client/home.controller");
route.get("/",homeController.index);

module.exports = route;