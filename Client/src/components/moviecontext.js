import React, { createContext, useState} from 'react';


export const moviecontext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  return (
    <moviecontext.Provider value={{movies , setMovies }}>
      {children}
    </moviecontext.Provider>
  );
};