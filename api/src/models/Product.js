const mongoose = require("mongoose");

//exportar una funcion q define el modelo con sus atributos, luego en db se inyecta squelize el conector
const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: false
    },
    price:{
        type: Number,
        required: true
    },
    categories:{
        type: Array,
        required: true
    },
    image:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true,
        min: 3,
        max: 5000,
        unique: false

    },
    color: {
        type: String,
        required: false,
        unique: false
    },
    size: {
        type: String,
        required: false,
        unique: false
    }

},{timestamps:true})

module.exports = mongoose.model("Product", ProductSchema)