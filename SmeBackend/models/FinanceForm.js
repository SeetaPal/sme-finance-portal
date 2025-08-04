const mongoose = require('mongoose');

const financeFormSchema = new mongoose.Schema({
  name: String,
  designation: String,
  company: String,
  mobile: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FinanceForm', financeFormSchema);
