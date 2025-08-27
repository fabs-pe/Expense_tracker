const express = require('express');
const { User } = require('../models/userModel');
const router = express.Router();



// create new user
router.post("/register", async (request, reponse) =>{
    try{
        let newUser = await User.create(request.body)
        reponse.status(201).json({message: 'User registered successfully!'});

        reponse.json({user: newUser});
    } catch{
        reponse.status(500).json({message: "An error occured during the update"});

    }
});

// POST to users/login

router.post