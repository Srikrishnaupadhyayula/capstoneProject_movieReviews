import React, { createContext, useState } from 'react';

export const usercontext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setuser] = useState('');

  return (
    <usercontext.Provider value={{ user, setuser }}>
      {children}
    </usercontext.Provider>
  );
};

