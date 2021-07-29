const express = require("express");
const { requireSignIn, adminMiddleware } = require("../../common-middleware");
const { updateOrder, getCustomerOrder } = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(`/update`, requireSignIn, adminMiddleware, updateOrder);
router.post(`/getCustomerOrders`, requireSignIn, adminMiddleware, getCustomerOrder);

module.exports = router;