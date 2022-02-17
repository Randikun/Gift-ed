const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
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
    payment: {

    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }

}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema)