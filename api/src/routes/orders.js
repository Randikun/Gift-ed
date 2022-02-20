const router = require("express").Router(); 
const {getAllOrders, getOrder, postOrder, updateOrder} = require("../controllers/orders.js");
const { verifyTokenAndAdmin } = require("./verifyToken.js");

router.get("/", verifyTokenAndAdmin ,getAllOrders);

router.get("/:orderId", verifyTokenAndAdmin, getOrder);

router.post("/", verifyTokenAndAdmin, postOrder)

router.put("/:orderId", verifyTokenAndAdmin,updateOrder)




module.exports = router;