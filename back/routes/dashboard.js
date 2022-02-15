const express = require('express');
const router = express.Router();
const user = require('../models/user');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  user
    .find()
    .then((per) => res.status(200).json(per))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

module.exports = router;
