import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import '../styles/components/bookingCard.css';
import { changeTimeFormat } from '../utils/index.js';

export default function BookingCard({booking}) {

  return (
    <Box className='bookingCard mb-18' style={{borderBottom: '1px solid #656565', paddingBottom: 18}}>
        <Box className='bookingAt'>
          예매 일시 &nbsp;|&nbsp; {changeTimeFormat(booking.bookingAt)}
        </Box>
        <Box>
          <Box className='movieTitle'>{booking.movieTitle}</Box>
          <Box className='infos'>
            <Box className='flex'><p className='grayFont'>상영 날짜</p>{booking.screenStartTime}</Box>
            <Box className='flex'><p className='grayFont'>상영 극장</p>{booking.auditoriumName}</Box>
            <Box className='flex'><p className='grayFont'>좌석</p>{booking.seatNumbers.join(', ')}</Box>
          </Box>
          <Box className='totPrice'>{booking.totPrice}</Box>
        </Box>
    </Box>
  );
}
