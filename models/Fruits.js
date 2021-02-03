const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    dateReview: {
        type: Date,
        required: true,
        default: Date.now
    } 
});

module.exports = mongoose.model('Fruit', fruitSchema);