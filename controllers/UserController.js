const express = require('express');
const { User } = require('../models/userModel');
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

// POST to users/login

router.post("login", async (request, response))


module.exports = router;