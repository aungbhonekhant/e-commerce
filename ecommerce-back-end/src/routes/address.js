const express = require('express');
const { userMiddleware, requireSignIn } = require('../common-middleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();

router.post('/create', requireSignIn, userMiddleware, addAddress);
router.post('/get', requireSignIn, userMiddleware, getAddress);

module.exports = router;