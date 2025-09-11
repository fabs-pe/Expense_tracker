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


// POST to users/login

// router.post("login", async (request, response))


module.exports = router;