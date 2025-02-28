import React from 'react';
import { useParams } from 'react-router-dom';
import UnderBarTitle from '../components/underBarTitle';


const Booking = () => {
    const token = localStorage.getItem('token');
    const identifier = localStorage.getItem('identifier');
    const role = localStorage.getItem('role');

    const { movieId } = useParams();

    return <>
        <UnderBarTitle title={'영화 예매'} />
        <div class="booking">
            예매 페이지 {movieId}
        </div>
    </>;
};

export default Booking;