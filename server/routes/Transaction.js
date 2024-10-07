const express = require('express');
const { getTransactions, addTransaction } = require('../controllers/Transaction');
const router = express.Router();

router.get('/getTransactions', getTransactions);
router.post('/addTransactions', addTransaction);

module.exports = router;
