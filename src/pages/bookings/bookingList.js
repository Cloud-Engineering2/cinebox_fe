import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import BookingTable from '../../components/BookingTable';
import useReq from '../../hooks/useReq';

const BookingList = () => {
    const { context } = useContext(AppContext);
    const [bookings, setBookings] = useState([]);

    // 예매목록 리스트
    const { data, isLoading, error } = useReq(process.env.REACT_APP_BOOKINGLIST_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    console.log("저장된 토큰: ", localStorage.getItem('token'));

    useEffect(() => {
        if (Array.isArray(data)) {
            setBookings(data);
        }
    }, [data]);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <div>
            <h1>예매 목록22</h1>
            {bookings.length === 0 ? (
                <p>예매한 목록이 없습니다.</p>
            ) : (
                bookings.map((booking) => (
                    <BookingTable key={booking.bookingId} booking={booking} />
                ))
            )}
        </div>
    );
};

export default BookingList;
