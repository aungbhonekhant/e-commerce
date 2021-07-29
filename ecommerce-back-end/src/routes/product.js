const express = require("express");

const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require("../controller/product");
const router = express.Router();

//fileupload
const multer = require("multer");
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  requireSignIn,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

//front-end route
router.get('/:slug', getProductsBySlug);
router.get('/get/products', requireSignIn, adminMiddleware, getProducts);
router.get('/get/:productId', getProductDetailsById);
router.delete("/delete/productById", requireSignIn, adminMiddleware, deleteProductById);


module.exports = router;
