const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  latestProducts,
  // createProduct,
  getProductImg,
} = require("../Controllers/productsController");

router.route("/image/:id").get(getProductImg);

router.route("/").get(getProducts);
router.route("/new").get(latestProducts);
router.route("/product/").get(getProductById);

module.exports = router;
