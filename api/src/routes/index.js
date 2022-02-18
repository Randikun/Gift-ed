const router = require("express").Router();

const ProductsRoute = require("./products")

const OrdersRoute = require("./orders")

router.use('/products', ProductsRoute)

router.use("/orders", OrdersRoute)

module.exports = router;