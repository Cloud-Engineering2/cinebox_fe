import { Box, Button } from '@mui/material';
import React from 'react';
import usePayment from '../hooks/usePayment';

const BookingTable = ({ booking }) => {
    const processPayment = usePayment();

    return (
        <Box className="bookingTable">
            <Box className="movieTitle">{booking.movieTitle}</Box>
            <Box className="info">
                <p>상영관: {booking.auditoriumName}</p>
                <p>좌석: {booking.seatNumbers.join(', ')}</p>
                <p>총 금액ss: {new Intl.NumberFormat('ko-KR').format(booking.totPrice)} 원</p>
            </Box>
            {booking.status === "PENDING" && (
                <Button onClick={() => processPayment(booking.bookingId, booking.totPrice)}>
                    결제하기
                </Button>
            )}
        </Box>
    );
};

export default BookingTable;
