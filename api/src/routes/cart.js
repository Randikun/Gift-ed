const router = require("express").Router(); 
const {createCart, updateCart, deleteCart, getUserCart, getAllCarts} = require("../controllers/cart.js");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken.js");

router.get("/", verifyTokenAndAdmin, getAllCarts)
router.post("/", verifyToken, createCart)
router.get("/:userId", verifyTokenAndAuthorization, getUserCart)
router.put("/:id", verifyTokenAndAuthorization, updateCart)
router.delete("/:id", verifyTokenAndAuthorization, deleteCart)

module.exports = router;