const router = require("express").Router();

const ProductsRoute = require("./products.js")

router.use('/products', ProductsRoute)

module.exports = router;