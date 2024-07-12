/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { moviecontext } from './moviecontext';
import axios from 'axios';

function Search() {
  const {setMovies} = useContext(moviecontext); // Assuming moviecontext provides [movies, setMovies]
  const [searchOption, setSearchOption] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const apidata = await getMovies();
      setMovies(apidata);
    };
    fetchMovies();
  }, []);

  const getMovies = async () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/movies`;

    switch (searchOption) {
      case '10latest':
        url = `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/movies/latest`;
        break;
      case '10oldest':
        url = `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/movies/oldest`;
        break;
      case 'toprated':
        url = `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/movies/top-rated`;
        break;
      default:
        break;
    }
    const options = {
        method: "GET",
        url: url ,
        headers: {
          accept: "application/json",
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
  };



  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSearchOption(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    window.location.href = `/spark/${searchTerm}` 
    setSearchTerm(''); // Clears the input after submission
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Updates the search term state
  };


  return (
    <div className="search-bar">
      <select className="dropdown" onChange={handleSelectChange}>
        <option value="All">All</option>
        <option value="10latest">10 latest releases</option>
        <option value="10oldest">10 oldest releases</option>
        <option value="toprated">Top Rated</option>
      </select>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="TITLE / Case sensitive"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
    </div>
  );
}

export default Search;
