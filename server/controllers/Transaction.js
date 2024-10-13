const Transaction = require('../models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
    const { name,amount, contact, location,service} = req.body;

     // Check for duplicate leads
     const existingLead = await Transaction.findOne({ contact });
     if (existingLead) {
       return res.status(400).json({ message: "Lead already exists." });
     }
  
    const newTransaction = new Transaction({
      name,
      amount,
      contact,
      location,
      service
    });
  
    try {
      const savedTransaction = await newTransaction.save();
      // Trigger LMS webhook to send lead data
      res.status(200).send('Lead captured successfully');
      // res.json(savedTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};
