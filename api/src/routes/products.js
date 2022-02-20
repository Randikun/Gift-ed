const router = require("express").Router(); 
const {getProducts, postProduct, getProductById, deleteProduct, updateProduct} = require("../controllers/products.js");
const { verifyTokenAndAdmin } = require("./verifyToken.js");

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", verifyTokenAndAdmin, postProduct)
router.delete("/:id", verifyTokenAndAdmin ,deleteProduct)
router.put("/:id", verifyTokenAndAdmin, updateProduct)

module.exports = router;