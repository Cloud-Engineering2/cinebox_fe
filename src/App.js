import React, { createContext, useState } from 'react';
import './App.css';
import './styles/button.css';
import './styles/init.css';


import Booking from './pages/bookings/booking.js';
import BookingDetails from './pages/bookings/bookingDetails.js';
import Confirmation from './pages/bookings/Confirmation.js';

import Detail from './pages/detail.js';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Mypage from './pages/mypage.js';
import Signup from './pages/signup.js';

import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary.js';
import Admin from './pages/admin/index.js';
import ScreenTable from './pages/admin/screenTable.js';
import Footer from './templates/footer.js';
import Header from './templates/header.js';
import { ToastContainer } from 'react-toastify';
import BookingTable from './pages/admin/bookingTable.js';
import KakaoRedirect from './pages/kakaoRedirect.js'
import KakaoSignup from './pages/kakaoSignup.js';

export const AppContext = createContext(null);
export default function App() {
  const [context, setContext] = useState({
    identifier: localStorage.getItem('identifier'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId'),
    cookie: document.cookie,
  });

  
  return <AppContext.Provider value={{ context, setContext }}>
    <ToastContainer />
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
              <Route path="/bookings/:bookingId" element={<BookingDetails />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/admin/screen/:movieId" element={<ScreenTable />} />
              <Route path="/admin/booking/:userId" element={<BookingTable />} />
              <Route path="/kakaoSignup" element={<KakaoSignup />} />
              <Route path="/auth/callback" element={<KakaoRedirect />} />
            </Routes>
          </Router>
        </Box>
        <Footer />
      </Box>
    </ErrorBoundary>

  </AppContext.Provider>;
}
