import React from 'react';
import Detail from './pages/detail.js';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Signup from './pages/signup.js';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/detail/:movieId" element={<Detail />} />
          <Route path="/detail/:paymentId" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
