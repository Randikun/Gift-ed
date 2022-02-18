const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
        },
    ],
    isPickUp: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: Object,
        required: true,
        default: ""
    },
    paymentFulfilled: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }

}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema)