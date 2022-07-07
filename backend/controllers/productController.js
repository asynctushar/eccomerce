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

//Update Product -- admin
exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(400).json({
            success: false,
            message: "Product not founded."
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
}

//Delete Product -- admin
exports.deleteProduct = async (req, res) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return res.status(400).json({
            success: false,
            message: "Product not founded."
        })
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    })
}

//Get Product Details
exports.getProductDetails = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(400).json({
            success: false,
            message: "Product not founded."
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}