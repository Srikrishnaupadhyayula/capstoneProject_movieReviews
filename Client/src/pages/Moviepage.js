import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Movie from '../components/Movie';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function Moviepage() {
  const { title } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/moviereviews/movie/${encodedTitle}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [title]);


  return (
    <div className="moviepage">
      <Navbar />
      <Movie movie={movie} /> 
    </div>
  );
}

export default Moviepage;
