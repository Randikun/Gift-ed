const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model("Cart", CartSchema);