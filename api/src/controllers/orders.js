const Order = require("../models/Order.js");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch(err) {
        next(err);
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

const postOrder = async (req, res) => {
    try {
        const newOrder = await new Order(req.body);
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = {getAllOrders, getOrder, postOrder};