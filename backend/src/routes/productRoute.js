const express = require("express")
const { AddProduct, getProducts } = require("../controllers/productController")

const router = express.Router();

router.post("/addproduct", AddProduct);
router.get("/getproducts", getProducts);


module.exports = router;