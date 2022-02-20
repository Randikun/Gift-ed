const Cart = require("../models/Cart")

const createCart = async(req, res) => {
    try {
        const newCart = await new Cart(req.body);
        const savedCart = await newCart.save();
        res.json(savedCart)
    } catch {
        (err) => next(err)
    }
}

const getUserCart = async(req, res) =>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.json(cart) 
    } catch {
        (err) => next(err)
    }
}

const updateCart = async(req, res) => {
    try{
        const cart = await Cart.findById(req.params.id);
        const updatedCart = await cart.updateOne({ $set: req.body }, {new:true});
        res.json(updateCart);
    }catch{
        (err) => next(err)
    }
}

const deleteCart = async(req, res) =>{
    try {
        const cart = await Cart.findById(req.params.id);
        await cart.deleteOne();
        res.json("cart has been deleted");

    } catch {
        (err) => next(err)
    }
}

const getAllCarts = async(req, res) =>{
    try{
       const carts = await Cart.find()
       res.json(carts)
    }catch{
        res.status(404).json("no carts found")
    }
}

module.exports = {createCart, getUserCart, updateCart, deleteCart, getAllCarts}