const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    clientName: String,
    saleAmount: Number,
    immediateDiscount: Number,
    installments: Number,
    installmentDiscount: Number,
    finalAmount: Number,
    paymentMethod: String
});

module.exports = mongoose.model('Sale', saleSchema);
