const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addTags, getTags } = require('../controller/tags');
const router = express.Router();

router.post('/create', requireSignIn, adminMiddleware, addTags);

router.get('/gettags', getTags);

module.exports = router;