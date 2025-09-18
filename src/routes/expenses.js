
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


// GET single expense by id
router.get('/:id', async (req, res) => {
  try{
    const result = await Expense.findById(req.params.id)
    if(!result){
      return res.status(404).json({message: "No Expenses Found"});
    }
    res.json({expense: result})
  } catch (err){
    res.status(500).json({message: "Error Fetching Expense", error: err.message});
  }
})

// GET expenses by catergory
router.get('/all/:category', async (req,res) => {
  try{
    const result = await Expense.find({category: req.params.category});
    if (!result.length){
      return res.status(404).json({message: 'Category Does Not Exist'});
    }
    res.json({ category: result})
  } catch (err){
    res.status(500).json({message: "Error Fetching Catergories", error: err.message})
  }
})
// GET expenses by expenseName
router.get('/name/:expenseName', async (req, res) => {
  try{
    const result = await Expense.find({expenseName: req.params.expenseName});
    if (!result.length){
      return res.status(404).json({message: 'Expense Name Not Found'});
    }
    res.json({expense: result})
  } catch(err){
    res.status(500).json({message: "Error Fetching Expense"})
  }
});

// GET expense by date
router.get('/date/:date', async (req,res) => {
  try {
    const date = new Date(req.params.date); // e.g. "2025-09-15"
    if (isNaN(date)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const result = await Expense.find({
      date: {
        $gte: date,     // greater than or equal to start of day
        $lt: nextDay    // less than next day
      }
    });
    if(!result.length){
      return res.status(404).json({message: 'No Expenses On That Date'})
    }
    res.json({expense: result})

  }catch(err){
    res.status(500).json({message: 'Error Fetching Expenses'})
  }
});

// GET expense by user id
// GET expense by amount

module.exports = router;
