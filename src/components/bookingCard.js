import React, { useState, useEffect, useContext } from 'react';
import {Card, Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import AgeLogo from './ageLogo.js';
import bookingCard from '../styles/components/bookingCard.css';
import init from '../styles/init.css';
import { AppContext } from "../App.js";

export default function BookingCard({booking}) {
  const {context, setContext} = useContext(AppContext);
  const bookingId = booking.bookingId;
  const movieId = booking.movieId;
  const bookCardId = `bookingCard${bookingId}`;

  const changeTimeFormat = (datetime)=>{
    const date = datetime.split('T')[0].replaceAll('-', '.');
    const time = datetime.split('T')[1].split('.')[0];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];

    return `${date} (${hour}:${min})`;
  }

  return (
    <Box className='bookingCard' >
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
