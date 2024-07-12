const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [10, 'Rating cannot be more than 10']
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Reviews', reviewSchema);