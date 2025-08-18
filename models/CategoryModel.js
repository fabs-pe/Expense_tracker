const mongoose =require('mongoose')

const Schema = mongoose.Schema;

const CatergorySchema= new Schema({

    categoryName:{
        type:  String,
        required: true,
        unique: false
    },

    categoryDesc: {
        type: String,
        required: true,
        unique: false
    }
});

const Category = mongoose.model('Category', CatergorySchema);

module.exports={
    Category
}