const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

    category:{
        type:Schema.Types.ObjectId,
        ref: 'Category',
        required: true

    },
    
    expenseName:{
        type: String,
        required: true,
        unquie: false,
        maxLength: 80
    
    },

    description:{
        type: String,
        required: true,
        unquie: false,
        maxLength: 255

    },

    amount:{
        type: Number,
        required: true,
        unquie: false

    },

    date:{
        type: Date,
        required: true,
        unquie: false

    },

})

const Expense= mongoose.model('Expense', ExpenseSchema);

module.exports={
    Expense
}