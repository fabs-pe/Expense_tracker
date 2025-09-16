
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
// GET expenses by expenseName
// GET expense by date

module.exports = router;
