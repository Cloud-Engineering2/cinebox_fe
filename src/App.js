import { Box } from '@mui/material';
import React, { createContext, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './pages/admin.js';
import Booking from './pages/booking.js';
import BookingList from './pages/bookingList.js'; // BookingList 컴포넌트 추가
import Detail from './pages/detail.js';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Mypage from './pages/mypage.js';
import Payment from './pages/payment.js';
import Signup from './pages/signup.js';
import Footer from './templates/footer.js';
import Header from './templates/header.js';

export const AppContext = createContext(null);

export default function App() {
  const [context, setContext] = useState({
    token: localStorage.getItem('token'),
    identifier: localStorage.getItem('identifier'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId')
  });

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <div className="App">
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
              <Route path="/payment" element={<Payment />} />
              <Route path="/bookings" element={<BookingList />} /> {/* 예매 목록 페이지 경로 추가 */}
            </Routes>
          </Router>
        </Box>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
