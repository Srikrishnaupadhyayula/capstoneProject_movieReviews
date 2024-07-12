import React, { useContext} from 'react';
import Navbar from '../components/Navbar'
import Reviews from '../components/Reviews'
import { moviecontext} from '../components/moviecontext'



function Mainpage() {
  const {movies} = useContext(moviecontext);

  return (
    <div className = "mainpage">
      <Navbar  />
      <Reviews movies= {movies}/>
    </div>
  );
}

export default Mainpage;