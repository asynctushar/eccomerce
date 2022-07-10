const express = require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();


router.route('/product/new').post(isAuthenticatedUser, authorizedRole('admin'), createProduct)
router.route('/products').get(getAllProduct);
router.route('/product/:id').put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails);


module.exports = router;