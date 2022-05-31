const express = require("express");
const { requireSignIn } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controller/admin/auth");
const { validateSignupRequest,validateSigninRequest, isRequestValidated } = require("../../validators/auth");
const router = express.Router();

//user sign in

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

//====>

//user sign up

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

//====>

//user signout

router.post("/admin/signout", signout );

//====>


module.exports = router;
