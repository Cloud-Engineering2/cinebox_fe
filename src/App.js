import React, { createContext, useState } from 'react';
import app from './App.css';
import init from './styles/init.css';
import button from './styles/button.css';
import Main from './pages/main.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Detail from './pages/detail.js';
import Mypage from './pages/mypage.js';
import Booking from './pages/booking.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './templates/footer.js';
import Header from './templates/header.js';
import { Box } from '@mui/material';
import Admin from './pages/admin/index.js';
import Util from './utils/index.js'
import ScreenTable from './pages/admin/screenTable.js';
import ErrorBoundary from './components/errorBoundary.js';

export const AppContext = createContext(null);
export default function App() {
  const [context, setContext] = useState({
    token: localStorage.getItem('token'),
    identifier: localStorage.getItem('identifier'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId')
  });

  return <AppContext.Provider value={{ context, setContext }}>
    <ErrorBoundary>
      <Box className="App">
        <Header />
        <Box style={{ minHeight: 'calc(100vh - 238px)' }}>
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="/main" element={<Main />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/detail/:movieId" element={<Detail />} />
              <Route path="/booking/:movieId" element={<Booking />} />
              <Route path="/screen/:movieId" element={<ScreenTable />} />
            </Routes>
          </Router>
        </Box>
        <Footer />
      </Box>
    </ErrorBoundary>
  </AppContext.Provider>;
}