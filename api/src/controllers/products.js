const Product = require("../models/Product")

const getProducts = async (req, res) => {
    const categoryFilter = req.query.categories
    try {
        let products;
        if(categoryFilter){
            products = await Product.find({
                categories:{
                    $in: [categoryFilter]
                }
            })
        }
        else{
            products = await Product.find()
        }
        res.json(products)
    } catch {
        (err) => next(err)
    }
}

const postProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct)
    } catch {
        (err) => next(err)
    }

}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product? res.json(product) : res.status(404).send("product not found")
    } catch {
        (err) => next(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.deleteOne();
        res.json("post has been deleted");

    } catch {
        (err) => next(err)
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        await product.updateOne({ $set: req.body });
        res.json("product updated");
    }catch{
        (err) => next(err)
    }
}




module.exports = {
    getProducts,
    postProduct,
    getProductById,
    deleteProduct,
    updateProduct
};