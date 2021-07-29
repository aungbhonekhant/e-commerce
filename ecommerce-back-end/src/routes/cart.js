const express = require('express');
const { requireSignIn, userMiddleware } = require('../common-middleware');
const { addItemToCart, getCartItems, removeCartItems } = require('../controller/cart');
const router = express.Router();

router.post('/add-to-cart',requireSignIn, userMiddleware, addItemToCart);

router.post('/getCartItems', requireSignIn, userMiddleware, getCartItems);

router.post('/removeItem', requireSignIn, userMiddleware, removeCartItems);

//router.get('/getcategory', getCategories);

module.exports = router;