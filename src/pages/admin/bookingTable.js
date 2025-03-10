import React, { useState, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import '../../styles/components/bookingTable.css';
import UnderBarTitle from '../../components/underBarTitle.js';
import { useParams } from 'react-router-dom';
import EmptyBox from '../../components/emptyBox.js';
import { Box } from '@mui/material';
import { changeTimeFormat, convertStartEndTimeFormatter } from '../../utils/index.js';

const BookingTable = () => {
    const { userId } = useParams();

    const { data: getUserBookingsRes, isLoading: isGetUserBookingsLoading, error: getUserBookingsError, doRequest: doGetUserBookingsRequest } = useReq(`http://127.0.0.1:8080/api/users/${userId}/bookings`, {
        method: 'GET'
    });
    const { data: deleteBookingRes, isLoading: isDeleteBookingLoading, error: deleteBookingError, doRequest: doDeleteBookingRequest } = useReq(process.env.REACT_APP_BOOKING_API, null);

    const deleteBooking = useCallback((bookingId, status) => {
        const cancelURL = process.env.REACT_APP_BOOKING_API + `/${bookingId}/cancel`;
        const refundURL = process.env.REACT_APP_BOOKING_API + `/${bookingId}`;

        doDeleteBookingRequest((status == 'CANCEL' ? cancelURL : refundURL), {
            method: 'POST'
        })
        window.location.reload();
    }, [])

    return <>
        <UnderBarTitle title={'사용자별 예약 리스트'} />
        <Box className='bookingTable'>
            {
                (getUserBookingsRes && getUserBookingsRes.length > 0) ? getUserBookingsRes.map(booking => {
                    return <>
                        <Box
                            key={`booking_${booking.bookingId}`}
                            id={`booking_${booking.bookingId}`}
                            style={{
                                marginBottom: 30,
                                border: '2px solid #004D09',
                                padding: 21,
                                borderRadius: 6
                            }}>
                            <Box className='flex'>
                                <Box className='width-180'>
                                    <img src={booking.posterImageUrl} className='width-100p'/>
                                </Box>
                                <Box className='width-83p'>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>예매 날짜</p>
                                        <p>{changeTimeFormat(booking.bookingAt)}</p>
                                    </Box>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>영화</p>
                                        <p>{booking.movieTitle}</p>
                                    </Box>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>상영관</p>
                                        <p>{booking.auditoriumName}</p>
                                    </Box>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>상영 시간</p>
                                        <p>{convertStartEndTimeFormatter(booking.screenStartTime, booking.screenEndTime)}</p>
                                    </Box>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>좌석</p>
                                        <p>{booking.seatNumbers.join(', ')}</p>
                                    </Box>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>결제 금액</p>
                                        <p>{booking.totPrice}</p>
                                    </Box>
                                    <Box className='userCard flex'>
                                        <p className='label mr-6'>예매 상태</p>
                                        <p>{booking.status}</p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className='controlBox'>
                                {booking.status != 'REFUNDED' && <button id="delete" type="button" className="button-sm" onClick={() => deleteBooking(booking.bookingId, (booking.status == 'PAID' ? 'REFUND' : 'CANCEL'))}>{booking.status == 'PAID' ? '예매 환불' : '예매 취소'}</button>}
                            </Box>
                        </Box>
                    </>
                }) : <EmptyBox text="예약 리스트가 없습니다." />
            }
        </Box>
    </>
};

export default BookingTable;