const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    release_date: {
        type: Date,
        required: [true, 'Release date is required']
    },
    poster: {
        type: String,
        required: [true, 'Poster is required']
    },
    trailer: {
        type: String,
        required: [true, 'Trailer is required']
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [10, 'Rating cannot be more than 10']
    },
    voters: {
        type: Number
    },
    runtime: {
        type: String,
        required: [true, 'Runtime is required']
    },
    certification: {
        type: String,
        required: [true, 'Certification is required']
    },
    language: {
        type: String,
        required: [true, 'Language is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    director: {
        type: String,
        required: [true, 'Director  required']
    },
    writer: {
        type: String,
        required: [true, 'Writers are required']
    },
    music: {
        type: String,
        required: [true, 'Musicians are required']
    },
    cast: {
        type: String,
        required: [true, 'Cast required']
    }
});

module.exports = mongoose.model('Movies', movieSchema);