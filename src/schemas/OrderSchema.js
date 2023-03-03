const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productData: { type: Object, required: true },
  userData: { type: Object, required: true },
  status: { type: String, required: true },
  date: { type: Date },
});

module.exports = OrderSchema;
