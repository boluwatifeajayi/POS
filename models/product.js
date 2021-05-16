let mongoose = require('mongoose');
let slugify = require('slugify')

//Article Schema
let productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        
    },
    quantity:{
        type: Number,
        
    },
    price: {
        type: Number,
        required: true
    }

    
});



let Product = module.exports = mongoose.model('Product', productSchema);