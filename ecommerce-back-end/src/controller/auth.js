const User = require("../models/user");
const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const shortId = require('shortid');

const generateJwtToken = (_id, role) => {
  return JWT.sign({_id, role}, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
}

exports.signup = (req, res) => {

  //check user already exit or not
  User.findOne({ email: req.body.email }).exec(async(error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered with this email",
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortId.generate(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        const token = generateJwtToken(data._id, data.role);
        const { _id, firstName, lastName, email, role, fullName } = data;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName }
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async(error, user) => {
    if (error) return res.status(400).json({ error });

    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === 'user') {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid Email or Password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!" });
    }
  });
};
