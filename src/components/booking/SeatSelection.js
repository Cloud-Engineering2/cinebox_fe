import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import

const SeatSelection = ({ selectedScreenId, selectedDate, selectedTime, selectedEndTime, onPayment, price }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();  // navigate 정의

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/api/screens/${selectedScreenId}/seats`, {
                    method: 'GET',
                    credentials: 'include',  // 쿠키를 포함하여 요청
                });

                if (!response.ok) throw new Error('좌석 정보를 불러오는 데 실패했습니다.');

                const data = await response.json();
                setSeats(data);
            } catch (error) {
                console.error('좌석 로딩 실패:', error);
            }
        };

        if (selectedScreenId) fetchSeats();
    }, [selectedScreenId, token]);

    const handleSeatSelect = (seatId) => {
        // 클릭한 좌석 정보 찾기
        const selectedSeat = seats.find((seat) => seat.seatId === seatId);
        // 클릭한 좌석 정보 콘솔 출력
        console.log("선택된 좌석 정보:", selectedSeat);
        // 선택된 좌석을 상태에 추가/제거
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seatId)
                ? prevSeats.filter((seat) => seat !== seatId)
                : [...prevSeats, seatId]
        );
    };

    // 가격 업데이트
    useEffect(() => {
        if (price) {
            setTotalPrice(selectedSeats.length * price);
        }
    }, [selectedSeats, price]);

    // 예매 생성 (결제 없이 진행)
    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            alert('최소 한 개의 좌석을 선택해주세요.');
            return;
        }

        try {
            // 1️⃣ 선택된 좌석들의 seatNumber만 배열로 추출
            const selectedSeatNumbers = seats
                .filter((seat) => selectedSeats.includes(seat.seatId))
                .map((seat) => seat.seatNumber);

            console.log("선택된 좌석 번호들:", selectedSeatNumbers);

            // 2️⃣ 예매 생성 (booking 생성)
            const bookingResponse = await fetch('http://127.0.0.1:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // 쿠키를 포함하여 요청
                body: JSON.stringify({
                    screenId: selectedScreenId, // 선택한 상영관
                    seatNumbers: selectedSeatNumbers,  // 선택된 좌석 번호들
                }),
            });

            if (!bookingResponse.ok) throw new Error('예매 생성 실패');

            const bookingData = await bookingResponse.json();
            console.log('예매 생성 완료:', bookingData);

            const bookingId = bookingData.bookingId; // 생성된 예매 ID

            // 예매된 정보 페이지로 이동
            navigate(`/bookings/${bookingId}`);

        } catch (error) {
            console.error('예매 처리 중 오류:', error);
            alert('예매 처리 중 문제가 발생했습니다.');
        }
    };

    // 총 좌석과 예약 가능한 좌석 수 계산
    const totalSeats = seats.length;
    const availableSeats = seats.filter((seat) => !seat.reserved).length;

    return (
        <div>
            <h3>상영 날짜: {selectedDate ? selectedDate : '선택된 날짜가 없습니다.'}</h3>
            <h3>상영 시간: {selectedTime} ~ {selectedEndTime}</h3>

            <h3>선택된 좌석:</h3>
            {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.seatId === seatId);
                return seat ? <span key={seatId}>{seat.seatNumber} </span> : null;
            })}

            <h3>결제 금액: {totalPrice.toLocaleString()}원</h3>

            <h3>총 좌석 수: {totalSeats}</h3>
            <h3>예약 가능한 좌석 수: {availableSeats}</h3>

            <h2>좌석 선택</h2>
            <div>
                {seats.map((seat) => (
                    <button
                        key={seat.seatId}
                        onClick={() => handleSeatSelect(seat.seatId)}
                        disabled={seat.reserved}
                        className={`seat ${seat.reserved ? 'reserved' : ''} ${selectedSeats.includes(seat.seatId) ? 'selected' : ''}`}
                    >
                        {seat.seatNumber}
                    </button>
                ))}
            </div>

            <button onClick={handleBooking} disabled={selectedSeats.length === 0}>
                결제하기
            </button>
        </div>
    );
};

export default SeatSelection;
