const router = require("express").Router(); 
const {getProducts, postProduct} = require("../controllers/products.js")

router.get("/", getProducts)
router.post("/", postProduct)

module.exports = router;