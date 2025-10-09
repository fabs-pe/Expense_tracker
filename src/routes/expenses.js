
const express = require('express');
const { Expense } = require('../models/ExpensesModel');
const router = express.Router();

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const results = await Expense.find({});
    res.json({ message: 'List of all expenses', expenses: results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
});

// GET expenses by category
router.get('/all/:category', async (req, res) => {
  try {
    const result = await Expense.find({ category: req.params.category });
    if (!result.length) {
      return res.status(404).json({ message: 'Category Does Not Exist' });
    }
    res.json({ category: result });
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Categories', error: err.message });
  }
});

// GET expenses by expense name
router.get('/name/:expenseName', async (req, res) => {
  try {
    const result = await Expense.find({ expenseName: req.params.expenseName });
    if (!result.length) {
      return res.status(404).json({ message: 'Expense Name Not Found' });
    }
    res.json({ expense: result });
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Expense', error: err.message });
  }
});

// GET expenses in a date range
// Example: /expenses/range?start=2025-09-01&end=2025-09-15
router.get('/range', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ message: 'Start and end dates are required' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    endDate.setDate(endDate.getDate() + 1);

    const result = await Expense.find({
      date: { $gte: startDate, $lt: endDate }
    });

    if (!result.length) {
      return res.status(404).json({ message: 'No expenses found in this date range' });
    }

    res.json({ expenses: result });
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Expense', error: err.message });
  }
});

//GET expenses by specific date
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    if (isNaN(date)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const result = await Expense.find({
      date: { $gte: date, $lt: nextDay }
    });

    if (!result.length) {
      return res.status(404).json({ message: 'No Expenses On That Date' });
    }

    res.json({ expenses: result });
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Expenses', error: err.message });
  }
});

// GET expense by ID (must come after everything else)
router.get('/:id', async (req, res) => {
  try {
    const result = await Expense.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'No Expenses Found' });
    }
    res.json({ expense: result });
  } catch (err) {
    res.status(500).json({ message: 'Error Fetching Expense', error: err.message });
  }
});

// GET expense by user id

// GET expense by amount

module.exports = router;
