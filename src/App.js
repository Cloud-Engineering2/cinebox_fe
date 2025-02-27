import React from 'react';
import app from './App.css';
import init from './styles/init.css';
import button from './styles/button.css';
import Main from './pages/main.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Detail from './pages/detail.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './templates/footer.js';
import Header from './templates/header.js';
import { Box } from '@mui/material';

function App() {
  return <>
    <div className="App">
    <Header/>
      <Box style={{height:'calc(100vh - 238px)'}}>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/detail/:movieId" element={<Detail />} />
          </Routes>
        </Router>
      </Box>
      <Footer/>
    </div>
  </>;
}

export default App;
