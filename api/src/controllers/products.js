const Product = require("../models/Product")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        next(err)
    }
}

const postProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct)
    } catch (err) {
        res.status(400).send('ocurrio un error')
    }

}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.deleteOne();
        res.json("post has been deleted");

    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        await product.updateOne({ $set: req.body });
        res.json("product updated");
    }catch(err){
        res.status(500).json(err)
    }
}




module.exports = {
    getProducts,
    postProduct,
    getProductById,
    deleteProduct,
    updateProduct
};