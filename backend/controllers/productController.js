const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Create Product -- admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


//Get All Products 
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
})

//Update Product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Page not found", 404))
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
})

//Delete Product -- admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Page not found", 404))
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    })
})

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Page not found."))
    }

    res.status(200).json({
        success: true,
        product
    })
})