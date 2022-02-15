const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authMiddleware = require('../helpers/authMiddleware');

// Route Create New product
// Path : http://localhost:3000/products/addProduct
router.post('/addProduct', (req, res) => {
  const { name, number, etat, buyingPrice, price, description } = req.body;
  const ProductModel = new Product({
    name,
    number,
    etat,
    buyingPrice,
    price,
    description,
  });
  ProductModel.save()
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

// Route Read All product
// Path : http://localhost:3000/products/allproduct
router.get('/salePage', (req, res) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

//Route  Update  product
// Path : http://localhost:3000/products/updateProduct
router.put('/updateProduct/:id', (req, res) => {
  const { id } = req.params;
  const { name, number, etat, buyingPrice, price, description } = req.body;
  Product.findByIdAndUpdate(
    id,
    { name, number, etat, buyingPrice, price, description },
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      }
      Product.findById(id)
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    }
  );
});

//Route Delete product
// Path : http://localhost:3000/products/deleteproduct/:id
router.delete('/deleteproduct/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});
router.get('/GetProduct/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});
module.exports = router;
