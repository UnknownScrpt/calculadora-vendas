const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  clientName: String,
  saleAmount: Number,
  immediateDiscount: Number,
  installments: Number,
  installmentDiscount: Number,
  paymentMethod: String,
  finalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);