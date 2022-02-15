const express = require('express');
const router = express.Router();
const authorized = require('../helpers/authMiddleware');
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//load connected user

router.get('/', authorized, (req, res) => {
  user
    .findById(req.userId)
    .select('-passwoerd')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'user not found!' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: 'sever error' });
    });
});

// login user
router.post(
  '/',
  body('email', 'Please enter a valid Email!').isEmail(),
  body('password', 'Password must contain minimum 5 characters!').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    user.findOne({ email: req.body.email }).then((user) => {
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Please Register Before!' }] });
      }
      if (
        req.body.email === process.env.ADMIN_ONE ||
        req.body.email === process.env.ADMIN_TWO
      ) {
        if (req.body.password === user.password) {
          return res.send({ msg: 'Welcome Admin!', role: user.role });
        }
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Wrong Password!' }] });
        } else {
          let payload = { userId: user._id, role: user.role };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);

module.exports = router;
