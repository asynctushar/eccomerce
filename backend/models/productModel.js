const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description."]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price."],
        maxlength: [8, "Price Can't Exceed Eight Digit"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category."]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxlength: [4, "Product Stock Can't Exceed 4 digit."],
        default: 1
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Products", productSchema);

module.exports = Product;