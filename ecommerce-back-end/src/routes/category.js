const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, updateCategories, getCategories, deleteCategories } = require('../controller/category');
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

router.post('/create',requireSignIn, adminMiddleware, upload.single("categoryImage"), addCategory);
router.post('/update',requireSignIn, adminMiddleware, upload.array("categoryImage"), updateCategories);
router.post('/delete',requireSignIn, adminMiddleware,  deleteCategories);

router.get('/getcategory', getCategories);

module.exports = router;