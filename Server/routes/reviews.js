const express = require('express')
const router = express.Router()
const reviewscontroller = require('../controllers/reviews')



// Review Routes
router.get('/reviews', reviewscontroller.getAllReviews)// Get all reviews by username
router.get('/reviews/comments', reviewscontroller.getAllComments) // Get all comments for a movie by title

// User Routes
router.post('/register', reviewscontroller.registerUser) // Register a new user
router.post('/login', reviewscontroller.loginUser) // Login user

// Movie Routes
router.get('/movie/:title', reviewscontroller.getMoviedetails);// Get movie details by title
router.get('/movies', reviewscontroller.getAllMovies) // Get all movies
router.get('/movies/latest', reviewscontroller.getLatestMovies) // Get latest movies
router.get('/movies/oldest', reviewscontroller.getOldestMovies) // Get oldest movies
router.get('/movies/top-rated', reviewscontroller.getTopRated) // Get top-rated movies

// Review Update and Delete Routes
router.post('/addreview', reviewscontroller.addReview)
router.patch('/updatereview/:id', reviewscontroller.updateReview) // Update a review
router.delete('/deletereview/:id', reviewscontroller.deleteReview) // Delete a review

module.exports = router;
