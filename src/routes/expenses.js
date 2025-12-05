
// const express = require('express');
// const { Expense } = require('../models/ExpensesModel');
// const { User } = require('../models/UserModel');
// const router = express.Router();

// // GET all expenses
// router.get('/', async (req, res) => {
//   try {
//     const results = await Expense.find({});
//     res.json({ message: 'List of all expenses', expenses: results });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching expenses', error: err.message });
//   }
// });

// ////////////////////////////////

// // GET expense by user,  by id,email or username
// router.get('/user/:value', async (req, res) => {
//   try {
//     const { value } = req.params;
//     let userId;

//     // Check if value is a valid MongoDB ObjectId
//     if (value.match(/^[0-9a-fA-F]{24}$/)) {
//       userId = value;
//     } else {
//       // Otherwise, search for user by username OR email
//       const user = await User.findOne({
//         $or: [
//           { userName: { $regex: new RegExp(`^${value}$`, 'i') } },
//           { email: { $regex: new RegExp(`^${value}$`, 'i') } }
//         ]
//       });

//       if (!user) return res.status(404).json({ message: 'User not found' });
//       userId = user._id;
//     }

//     // Fetch expenses for this user
//     const expenses = await Expense.find({ user: userId }).populate('user', 'userName email');
//     if (!expenses.length) return res.status(404).json({ message: 'No expenses found for this user' });

//     res.json({ expenses });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching expenses', error: err.message });
//   }
// });

// // GET expense by ID (must come after everything else)
// router.get('/:id', async (req, res) => {
//   try {
//     const result = await Expense.findById(req.params.id);
//     if (!result) {
//       return res.status(404).json({ message: 'No Expenses Found' });
//     }
//     res.json({ expense: result });
//   } catch (err) {
//     res.status(500).json({ message: 'Error Fetching Expense', error: err.message });
//   }
// });

// ////////////////////////////////////

// // GET expenses by category
// router.get('/all/:category', async (req, res) => {
//   try {
//     const result = await Expense.find({ category: req.params.category });
//     if (!result.length) {
//       return res.status(404).json({ message: 'Category Does Not Exist' });
//     }
//     res.json({ category: result });
//   } catch (err) {
//     res.status(500).json({ message: 'Error Fetching Categories', error: err.message });
//   }
// });

// //////////////////////////////////////

// // GET expenses by expense name
// router.get('/name/:expenseName', async (req, res) => {
//   try {
//     const result = await Expense.find({ expenseName: req.params.expenseName });
//     if (!result.length) {
//       return res.status(404).json({ message: 'Expense Name Not Found' });
//     }
//     res.json({ expense: result });
//   } catch (err) {
//     res.status(500).json({ message: 'Error Fetching Expense', error: err.message });
//   }
// });

// //////////////////////////////////////////

// // GET expenses in a date range
// // Example: /expenses/range?start=2025-09-01&end=2025-09-15
// router.get('/range', async (req, res) => {
//   try {
//     const { start, end } = req.query;
//     if (!start || !end) {
//       return res.status(400).json({ message: 'Start and end dates are required' });
//     }

//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     if (isNaN(startDate) || isNaN(endDate)) {
//       return res.status(400).json({ message: 'Invalid date format' });
//     }

//     endDate.setDate(endDate.getDate() + 1);

//     const result = await Expense.find({
//       date: { $gte: startDate, $lt: endDate }
//     });

//     if (!result.length) {
//       return res.status(404).json({ message: 'No expenses found in this date range' });
//     }

//     res.json({ expenses: result });
//   } catch (err) {
//     res.status(500).json({ message: 'Error Fetching Expense', error: err.message });
//   }
// });

// //GET expenses by specific date
// router.get('/date/:date', async (req, res) => {
//   try {
//     const date = new Date(req.params.date);
//     if (isNaN(date)) {
//       return res.status(400).json({ message: 'Invalid date format' });
//     }

//     const nextDay = new Date(date);
//     nextDay.setDate(date.getDate() + 1);

//     const result = await Expense.find({
//       date: { $gte: date, $lt: nextDay }
//     });

//     if (!result.length) {
//       return res.status(404).json({ message: 'No Expenses On That Date' });
//     }

//     res.json({ expenses: result });
//   } catch (err) {
//     res.status(500).json({ message: 'Error Fetching Expenses', error: err.message });
//   }
// });

// //////////////////////////////////////

// // GET expense by amount
// router.get('/amount/:amount', async (req, res) => {
//   try{
//     const result = await Expense.find({amount: req.params.amount});
//     if (!result.length){
//       return res.status(404).json({message: 'No expenses at that amount'});
//     }
//     res.json({expense: result})
//   } catch(err){
//     res.status(500).json({message: 'Error fetching expenses', error: err.message});
//   }
// })


// module.exports = router;

const express = require('express');
const router = express.Router();
const { Expense } = require('../models/ExpensesModel');
const { User } = require('../models/UserModel');

// ==========================
// GET all expenses
// ==========================
router.get('/', async (req, res) => {
  try {
    const results = await Expense.find().populate('user', 'userName email');
    res.json({ message: 'List of all expenses', expenses: results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
});

// ==========================
// Flexible filter endpoint
// Can filter by:
// user (ID, username, email), category, expenseName (partial), minAmount, maxAmount, date, start/end range
// Example: /expenses/filter?user=fabian&category=Food&minAmount=50&maxAmount=200&start=2025-09-01&end=2025-09-15
// ==========================
router.get('/filter', async (req, res) => {
  try {
    const { user, category, expenseName, minAmount, maxAmount, date, start, end } = req.query;
    const query = {};

    // ----- User filter (ID, username, email) -----
    if (user) {
      let userId = user;
      if (!user.match(/^[0-9a-fA-F]{24}$/)) {
        const foundUser = await User.findOne({
          $or: [
            { userName: { $regex: new RegExp(`^${user}$`, 'i') } },
            { email: { $regex: new RegExp(`^${user}$`, 'i') } }
          ]
        });
        if (!foundUser) return res.status(404).json({ message: 'User not found' });
        userId = foundUser._id;
      }
      query.user = userId;
    }

    // ----- Category filter -----
    if (category) {
      query.category = category;
    }

    // ----- Expense name filter (partial, case-insensitive) -----
    if (expenseName) {
      query.expenseName = { $regex: expenseName, $options: 'i' };
    }

    // ----- Amount filter -----
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }

    // ----- Date filter -----
    if (date) {
      const d = new Date(date);
      if (isNaN(d)) return res.status(400).json({ message: 'Invalid date format' });
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + 1);
      query.date = { $gte: d, $lt: nextDay };
    } else if (start || end) {
      const startDate = start ? new Date(start) : new Date('1970-01-01');
      const endDate = end ? new Date(end) : new Date();
      if (isNaN(startDate) || isNaN(endDate)) return res.status(400).json({ message: 'Invalid date format' });
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    // ----- Fetch filtered expenses -----
    const expenses = await Expense.find(query).populate('user', 'userName email');
    if (!expenses.length) return res.status(404).json({ message: 'No expenses found matching the filters' });

    res.json({ expenses });

  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
});

// ==========================
// GET single expense by ID
// ==========================
router.get('/:id', async (req, res) => {
  try {
    const result = await Expense.findById(req.params.id).populate('user', 'userName email');
    if (!result) return res.status(404).json({ message: 'No expense found' });
    res.json({ expense: result });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expense', error: err.message });
  }
});



// ||||||||||||||||||||||
//  POST ENDPOINT
// ||||||||||||||||||||||

router.post("/add", async (request, response) => {
  try{
    let newExpense = await Expense.create(request.body)
    response.status(201).json({message: "Expense created successfully!!"})
  
    response.json({expense: newExpense});
  } catch (err) {
    response.status(500).json({message: "An error ocurred and expenses was not created", error: err.message})
  }
});


module.exports = router;


