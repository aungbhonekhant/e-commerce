const express = require("express");
const { signup, signin } = require("../controller/auth");
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require("../validators/auth");
const router = express.Router();

//user sign in

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

//====>

//user sign up

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

//====>

//user Profile

// router.post('/profile', requireSignIn, (req, res) => {
//     res.status(200).json({ user: 'profile' });
// })

//====>

module.exports = router;
