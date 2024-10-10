const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    enum: ['India', 'USA', 'UK', 'China', 'Japan'],
    required: true
  },
  service: {
    type: String,
    enum: ['Investment Advice', 'Wealth Management', 'Financial Planning'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
