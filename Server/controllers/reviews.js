const review = require('../models/Reviews')
const User = require('../models/Users')
const Movie = require('../models/Movies')

exports.getAllReviews = async (req, res) => {
    try {
        const { username } = req.query;
        const allReviews = await review.find({username })
        return res.status(200).send(allReviews)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to fetch all reviews' })
    }
}

exports.getAllComments = async (req, res) => {
    try {
        const { title } = req.query;
        const allComments = await review.find({title})
        return res.status(200).send(allComments)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to fetch all comments' })
    }
}

exports.registerUser = async (req, res ) => {
    try {
        const { username, email, password } = req.body;

        const newusername = username.toLowerCase();
        const userexists = await User.findOne({ username : newusername });
        if (userexists) {
            return res.status(400).send({ message: 'Username already exists.' })
        }

        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(400).send({ message: 'Email already exists' })
        }

        const newUser = await User.create({ username : newusername , email: newEmail, password });
        res.status(201).json(`New User ${newUser.email} registered`);
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'User Registration Failed.' })
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const newusername = username.toLowerCase();
        const user = await User.findOne({ username : newusername });

        if (!user) {
            return res.status(400).send({ message: 'Invalid Credentials.' })
        }

        const comparePass = (password === user.password);

        if (!comparePass) {
            return res.status(400).send({ message: 'Invalid Credentials' })
        }

        res.status(200).send(username);
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Login faild. ' })
    }
};

exports.getMoviedetails = async (req, res) => {
    try {
        const { title } = req.params;
        const movieDetails = await Movie.findOne({ title });
    
        if (!movieDetails) {
          return res.status(404).send({ message: 'Movie not found' });
        }
    
        return res.status(200).send(movieDetails);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send({ message: 'Failed to fetch movie details' });
    };
}

exports.getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        return res.status(200).send(allMovies)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Error fetching all movies' })
    }
};

exports.getLatestMovies = async (req, res) => {
    try {
        const latestMovies = await Movie.find()
            .sort({ release_date: -1 })
            .limit(10); 
        return res.status(200).send(latestMovies);
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Error fetching latest movies' });
    }
};
  
exports.getOldestMovies = async (req, res) => {
    try {
        const oldestMovies = await Movie.find()
            .sort({ release_date: 1 })
            .limit(10);
        return res.status(200).send(oldestMovies);
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Error fetching oldest movies' });
    }
};

exports.getTopRated = async (req, res) => {
    try {
        const topRated = await Movie.find()
            .sort({ rating: -1 })
            .limit(10);
        return res.status(200).send(topRated);
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Error fetching top Rated  movies' });
    }
};

exports.addReview = async (req, res) => {
    const {title,  username,  rating, comment } = req.body;

    if (!username || !title || rating == null) {
        return res.status(400).send({ message: 'Username, title, and rating are required' });
    }

    if (rating < 0 || rating > 10) {
        return res.status(400).send({ message: 'Rating must be between 0 and 10' });
    }
    try {
        const addedReview = await review.create(req.body);
        return res.status(201).send(addedReview); 
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send({ message: 'Failed to add review' });
    }
}



exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(updatedReview)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to update review' })
    }
}

exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await review.findByIdAndDelete(id);
        return res.status(200).send(deletedReview)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to delete review' })
    }
}
