const router = require("express").Router();

const ProductsRoute = require("./products")

const OrdersRoute = require("./orders")

const AuthRoute = require("./auth")

router.use('/products', ProductsRoute)

router.use("/orders", OrdersRoute)

router.use("/auth", AuthRoute)

module.exports = router;