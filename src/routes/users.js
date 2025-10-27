require('dotenv').config();
const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// ||||||||||||||||||||||||
//  GET ENDPOINTS
// ||||||||||||||||||||||||

// will need to be edittted to allow for roles

//  GET all USers
router.get('/', async (req, res) => {
  try {
    const results = await User.find({});
    res.json({ message: 'List Of All Users', users: results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// GET user by id
router.get('/one/:id', async (req, res) => {
  try {
    const result = await User.findById(req.params.id); 
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: result });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

// GET user by userName 
// add permissions
router.get('/name/:userName', async (req, res) => {
  try {
    const result = await User.findOne({ userName: req.params.userName });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: result });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});


// GET user by groupName
// add permissions
router.get('/group/:groupName', async (req, res) => {
    try{
        const result = await User.find({groupName: req.params.groupName});
        if(!result.length){
            return res.status(404).json({message: "Group Name Does Not Exisit"})   
        }
        res.json({user: result});
    } catch (err) {
        res.status(500).json({message: "Error fetching Group", error: err.message});
        
    }
})

// GET user by email
// add permissions
router.get('/:email', async (req, res) => {
    try{
        const result = await User.find({email: req.params.email});
        if (!result.length){
            return res.status(404).json({message: "Email Does Not Exisit"})
        }
        res.json({ user: result});

    } catch(err){
        res.status(500).json({message: "Error Fetching User", error: err.message});
    }
})


// ||||||||||||||||||||||
//  POST ENDPOINT
// ||||||||||||||||||||||

//  POST create new user
router.post("/register", async (request, response) =>{
    try{
        let newUser = await User.create(request.body)
        response.status(201).json({message: 'User registered successfully!'});

        response.json({user: newUser});
    } catch (err){
        response.status(500).json({message: "An error occured during the registering User", error: err.message});

    }
});

// POST to users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password (you had a small typo here)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.WORKER_JWT_KEY, // make sure this exists in .env
      { expiresIn: '3h' }
    );

    // Respond with token + user info
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});



module.exports = router;