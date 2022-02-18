const router = require("express").Router(); 
const {getAllOrders, getOrder, postOrder} = require("../controllers/orders.js")

router.get("/", getAllOrders);

router.get("/:orderId", getOrder);

router.post("/", postOrder)



module.exports = router;