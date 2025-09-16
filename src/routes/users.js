const express = require('express');
const { User } = require('../models/UserModel');
const router = express.Router();



// create new user
router.post("/register", async (request, response) =>{
    try{
        let newUser = await User.create(request.body)
        response.status(201).json({message: 'User registered successfully!'});

        response.json({user: newUser});
    } catch{
        response.status(500).json({message: "An error occured during the update"});

    }
});

// will need to be edittted to allow for roles

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


// POST to users/login

// router.post("login", async (request, response))


module.exports = router;