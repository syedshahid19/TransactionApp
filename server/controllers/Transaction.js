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
    const { amount, description, name, contact, location } = req.body;
  
    const newTransaction = new Transaction({
      amount,
      description,
      name,
      contact,
      location
    });
  
    try {
      const savedTransaction = await newTransaction.save();
      res.json(savedTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};
