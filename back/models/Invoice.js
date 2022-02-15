const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  number: { type: Number, require: true },
  totalPrice: { type: Number, require: true },
  discount: { type: Number, require: true },
  vat: { type: Number, require: true },
  date: {type: Date, default: Date.now()},
  idUsers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  idProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
