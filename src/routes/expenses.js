// src/routes/expenses.js
const express = require('express');
const { Expense } = require('../models/ExpensesModel');
const router = express.Router();

// GET all expenses
router.get('/', async (req, res) => {
 try{
  const results = await Expense.find({});
  res.json({message: 'List of all expenses', expenses: results});
 } catch (err) {
  res.status(500).json({message: 'Error fetching expenses', error: err.message})
 }
});


// POST create a new expense
router.post('/', (req, res) => {
  const { title, amount } = req.body;
  res.json({ message: 'Expense created', data: { title, amount } });
});

// GET single expense by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get expense ${id}` });
});

module.exports = router;
