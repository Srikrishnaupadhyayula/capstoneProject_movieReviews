import React from 'react';
import { Link } from 'react-router-dom';



function Reviews(props) {
  return (
    <div className = "main">
      <div className="container">
        {props.movies.map((movie, index) => (

          <div key = {index} className = "movie">
            <Link to ={`/spark/${movie.title}`}>
              <div className="movie-poster">
                <img src = {require(`../assets/${movie.poster}`)} alt =" "></img>
              </div>
            </Link>
            <div className = "review">
              <div className="star">★</div>
              <div className = "rating"><b>{movie.rating}</b></div>
              <Link to = {`/spark/${movie.title}`}>
                <div className = "give"><button><span className = "star">★</span>Rate</button></div>
              </Link>
            </div>
            <div className = "title">{movie.title}</div>
            <a  className = 'text' href = {movie.trailer} >
            <div className = "trailer"><button><b>Watch Trailer</b></button></div>
            </a>
            <div className="more"><Link to ={`/spark/${movie.title}`}>More Info</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;