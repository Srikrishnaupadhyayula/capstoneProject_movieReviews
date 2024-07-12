import React, { useState, useEffect, useContext } from 'react';
import { usercontext } from './usercontext';
import axios from 'axios';

function Movie({ movie }) {
  const { user } = useContext(usercontext);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newrating, setNewrating] = useState('');
  const [newcomment, setNewcomment] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const apidata = await getReviews();
      setReviews(apidata);
    };
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.title]);

  const getReviews = async () => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/reviews/comments?title=${movie.title}`,
      headers: {
        accept: "application/json",
      },
    };
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    if (!user) {
      setShowReviewBox(false);
    }
  }, [user]);

  const handleRateNowClick = () => {
    if (!user) {
      window.location.href = '/signin';
    } else {
      setShowReviewBox(true);
    }
  };

  const addReview = async () => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/addReview`,
      headers: {
        accept: "application/json",
      },
      data: {
        title: movie.title,
        username: user,
        rating: newrating,
        comment: newcomment,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setShowReviewBox(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getImage = (poster) => {
    try {
      return require(`../assets/${poster}`);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  return (
    <div className="moviecon">
      <div className='moviebox'>
        <div className='details'>
          <div className='poster'>
            <img src={getImage(movie.poster)} alt=" " />
          </div>
          <div className="info">
            <span className='movie-title'>{movie.title}</span>
            <span className="detail-element">{formatDate(movie.release_date)}</span>
            <div className="detail-element">
              <span className="star">★ </span>&nbsp;{movie.rating}/10 &nbsp;&nbsp;&nbsp;
              <button className="rate-now" onClick={handleRateNowClick}>Rate now</button>
            </div>
            <span className='detail-element'>{movie.runtime} • {movie.certification} • {movie.language} • {movie.genre}</span>
            <span className="detail-element">Director • <span className="names">{movie.director}</span></span>
            <span className="detail-element">Writer/s • <span className="names">{movie.writer}</span></span>
            <span className="detail-element">Music • <span className="names">{movie.music}</span></span>
            <span className="detail-element">Actors •&nbsp;<span className="names">{movie.cast}</span></span>
          </div>
        </div>

        <div className='comments'>
          {showReviewBox && (
            <div className='comment'>
              <div className='usercon'>
                <div className='userrate'>
                  {user}&nbsp;&nbsp;&nbsp;&nbsp;<span className='ratee'>★ </span>
                  <input
                    className='newrating'
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    onChange={(event) => setNewrating(event.target.value)}
                    max="10"
                    min="0"
                  />
                </div>
                <div className='submitcon'>
                  <button onClick={addReview}>Submit</button>
                </div>
              </div>
              <div className='usercom'>
                <textarea
                  className='newcomment'
                  name="comment"
                  placeholder="Your comment"
                  onChange={(event) => setNewcomment(event.target.value)}
                />
              </div>
            </div>
          )}
          {reviews.map((review, index) => (
            <div className='comment' key={index}>
              <div className='usercon'>
                <div className='userrate'>
                  {review.username} &nbsp;&nbsp;&nbsp;&nbsp;<span className='ratee'>★ </span>{review.rating}
                </div>
              </div>
              <div className='usercom'>
                {review.comment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movie;
