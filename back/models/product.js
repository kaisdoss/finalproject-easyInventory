const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, require: true },
  number: { type: Number, require: true },
  etat: {
    type: String,
    enum: ["en stock", "hors stock"],
    default: "en stock",
  },
  buyingPrice: { type: Number, require: true },
  price: { type: Number, require: true },
  description: { type: String },
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice"
    }
  ]
});

module.exports = mongoose.model("Product", ProductSchema);
