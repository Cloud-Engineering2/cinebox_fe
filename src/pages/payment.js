import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UnderBarTitle from '../components/underBarTitle';
import useReq from '../hooks/useReq';

const Payment = () => {
    const [amount, setAmount] = useState('');
    const [bookingId, setBookingId] = useState('');
    const { data, doRequest, error, isLoading } = useReq(process.env.REACT_APP_PAYMENT_URL, null);

    const handlePayment = () => {
        if (!amount || !bookingId) {
            alert("금액과 예약 ID를 입력하세요.");
            return;
        }

        doRequest(process.env.REACT_APP_PAYMENT_URL, {
            method: 'POST',
            data: {
                amount: parseInt(amount, 10),
                bookingId: parseInt(bookingId, 10),
            },
        });
    };

    useEffect(() => {
        if (data) {
            alert("결제 완료! 결제 ID: " + data.paymentId);
            window.location.href = '/main';
        }
    }, [data]);

    return (
        <div>
            <UnderBarTitle title="결제하기" />

            <div className="payment-form">
                <TextField
                    label="금액"
                    variant="standard"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <TextField
                    label="예약 ID"
                    variant="standard"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                />

                {error && <div className="error">에러 발생: {error.message}</div>}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayment}
                    disabled={isLoading}
                >
                    결제하기
                </Button>
            </div>
        </div>
    );
};

export default Payment;
