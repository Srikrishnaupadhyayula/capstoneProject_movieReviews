import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from  './pages/Mainpage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Moviepage from './pages/Moviepage';
import User from './pages/User'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/spark" element={<Mainpage />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/spark/:title" element={<Moviepage />}></Route>
        <Route path="/spark/user/:username" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
