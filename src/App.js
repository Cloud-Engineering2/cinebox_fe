import React from 'react';
import app from './App.css';
import init from './styles/init.css';
import button from './styles/button.css';
import Main from './pages/main.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Detail from './pages/detail.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './pages/booking.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/detail/:movieId" element={<Detail />} />
          <Route path="/booking/:movieId" element={<Booking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
