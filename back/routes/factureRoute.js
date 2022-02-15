const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Product = require('../models/product');
const User = require('../models/user');
const authMiddleware = require('../helpers/authMiddleware');

// Route Create New facture
// Path : http://localhost:3000/facture/addFacture
router.post('/addFacture', authMiddleware, (req, res) => {
  const { idProducts, number, totalPrice, discount, vat, idUsers } = req.body;
  const factureModel = new Invoice({
    idProducts,
    number,
    totalPrice,
    discount,
    vat: 10,
    idUsers,
  });
  factureModel
    .save()
    .then((facture) => res.json(facture))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

// Route Read All facture
// Path : http://localhost:3000/facture/allFacture
router.get('/allFacture', (req, res) => {
  Invoice.find()
    .populate('idUsers')
    .populate('idProducts')
    .then((factures) => res.status(200).json(factures))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

//////
router.post('/postInvoice', (req, res) => {
  console.log(req.body);
  const IvoiceModel = new Invoice(req.body);
  IvoiceModel.populate('idUsers')
    .populate('idProducts')
    .save()
    .then((factures) => {
      console.log('1111111:', factures);
      res.status(200).json(factures);
    })
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

//////////////////////////

router.get('/getFacture/:id', authMiddleware, (req, res) => {
  console.log(req);
  const { id } = req.params.id;
  Db.Invoice.findById(id)
    .then((factures) => {
      Db.Product.find({ _id: { $in: factures.idProducts } }).then(
        (Products) => {
          const Result = new Object({
            number: factures.number,
            totalPrice: factures.totalPrice,
            discount: factures.discount,
            vat: factures.vat,
            date: factures.date,
            Products: Products,
          });
          res.status(200).json(Result);
        }
      );
    })
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.get('/getFactureV2/:id', async (req, res) => {
  try {
    const { id } = req.params.id;
    var InvoiceList = await (await Invoice.findById(req.params.id)).exec();
    const ProductList = await Product.find({
      _id: { $in: InvoiceList.idProducts },
    }).exec();
    console.log(ProductList);
    const UserList = await User.findOne({ _id: InvoiceList.idUsers }).exec();
    console.log(UserList);
    const Result = {
      number: InvoiceList.number,
      totalPrice: InvoiceList.totalPrice,
      discount: InvoiceList.discount,
      vat: InvoiceList.vat,
      date: InvoiceList.date,
      Products: ProductList,
      User: UserList,
    };
    res.status(200).json(Result);
    // res.status(200).json(InvoiceList);
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error }] });
  }
});

//Route Delete facture
// Path : http://localhost:3000/facture/deleteFacture/:id
router.delete('/deleteFacture/:id', (req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then((facture) => res.json(facture))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

//Route  Update  facture
// Path : http://localhost:3000/facture/updateFacture
router.put('/updateFacture', (req, res) => {
  const { id, idProduct, number, totalPrice, discount, vat } = req.body;
  Invoice.findByIdAndUpdate(
    id,
    {
      idProduct,
      number,
      totalPrice,
      discount,
      vat,
    },
    (err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      }
      Invoice.findById(id)
        .then((facture) => res.status(200).json(facture))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    }
  );
});

module.exports = router;
