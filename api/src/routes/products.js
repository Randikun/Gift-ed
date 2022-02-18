const router = require("express").Router(); 
const {getProducts, postProduct, getProductById, deleteProduct, updateProduct} = require("../controllers/products.js")

router.get("/", getProducts)
router.post("/", postProduct)
router.get("/:id", getProductById)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)

module.exports = router;