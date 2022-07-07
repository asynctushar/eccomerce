const Product = require('../models/productModel');

//Create Product -- admin
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}


//Get All Products 
exports.getAllProduct = async (req, res) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
}