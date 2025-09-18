const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    userName:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unquie: true
    },

    password:{
        type: String,
        required: true,
        minLength: 8,
        unique: false

    },

    groupName:{
        type: String,
        required: true,
        unique: false,
        
    },

    role: {
        type: String,
        required: true,
        default: 'kid',
        enum: ['adult', 'kid'],
        unique: false
    }

});

//  pre-hook
UserSchema.pre(
    'save',
    async function (next){
        const user = this;
        // if password wasnt changed to plain text, skip to next function
        if (!user.isModified('password')) return next();
        // if password was changed, assume it was to plaintext and hash it
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next()
    }
);

// password validation
UserSchema.methods.isPasswordValid = function (password){
    return /^[a-zA-Z0-9]{8,30}$/.test(password);
};


const User= mongoose.model('User', UserSchema);

module.exports={
    User
}
