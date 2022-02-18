const router = require("express").Router(); 
const {getAllOrders, getOrder, postOrder, updateOrder} = require("../controllers/orders.js")

router.get("/", getAllOrders);

router.get("/:orderId", getOrder);

router.post("/", postOrder)

router.put("/:orderId", updateOrder)




module.exports = router;