import { Box } from '@mui/material';
import React from 'react';
import '../styles/components/bookingCard.css';
import { changeTimeFormat } from '../utils/datetime.js';

export default function BookingCard({ booking }) {

  return (
    <Box className='bookingCard mb-18' style={{ borderBottom: '1px solid #656565', paddingBottom: 18 }}>
      <Box className='bookingAt'>
        예매 일시 &nbsp;|&nbsp; {changeTimeFormat(booking.bookingAt)}
      </Box>
      <Box>
        <Box className='movieTitle'>{booking.movieTitle}</Box>
        <Box className='infos'>



          <Box className='flex'>
            <p className='grayFont'>상영 날짜</p>
            {new Date(booking.screenStartTime).toLocaleString('ko-KR', {
              weekday: 'long', // 요일 출력
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,  // 24시간 형식
            }).replace(/:\d{2}$/, '')} {/* 초 부분 제거 */}
          </Box>
          <Box className='flex'><p className='grayFont'>상영 극장</p>{booking.auditoriumName}</Box>
          <Box className='flex'><p className='grayFont'>좌석</p>{booking.seatNumbers.join(', ')}</Box>
        </Box>
        <Box className='totPrice'>
          {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(booking.totPrice)}
        </Box>
      </Box>
    </Box>
  );
}
