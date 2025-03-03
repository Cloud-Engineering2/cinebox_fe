import React, { useState, useEffect } from 'react';
import booking from '../styles/pages/booking.css'
import UnderBarTitle from '../components/underBarTitle';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

const Booking = () => {
    const { movieId } = useParams();

    return <>
        <UnderBarTitle title={'영화 예매'}/>
        <Box className="booking">
            예매 페이지 {movieId}
        </Box>
    </>;
};

export default Booking;