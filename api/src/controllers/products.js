const Product = require("../models/Product")

const getProducts = async (req, res) => {
    try{
       const products = await Product.find()
       res.json(products)
    }catch(err){
        next(err);
    }
}

const postProduct = async(req, res) =>{
    try{
        const newProduct = await new Product(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct)
    }catch(err){
        res.status(400).send('ocurrio un error')
    }

}

module.exports = {getProducts, postProduct};