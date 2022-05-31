const express = require('express');
const { requireSignIn, adminMiddleware, upload } = require('../common-middleware');
const { addBrand, getBrands, updateBrand, deleteBrandById } = require('../controller/brand');
const router = express.Router();

router.post('/create',requireSignIn, adminMiddleware, upload.single("brandImage"), addBrand);
router.post('/update',requireSignIn, adminMiddleware, upload.single("brandImage"), updateBrand);
router.post('/delete',requireSignIn, adminMiddleware,  deleteBrandById);

router.get('/getbrands', getBrands);

module.exports = router;