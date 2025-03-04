import React, { useEffect, useState } from 'react';

const SeatSelection = ({ selectedScreenId, selectedDate, selectedTime, onPayment }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/screens/${selectedScreenId}/seats`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('좌석 정보를 불러오는 데 실패했습니다.');
                }
                const data = await response.json();
                console.log('불러온 좌석 데이터:', data); // ✅ 좌석 데이터 확인
                setSeats(data);
            } catch (error) {
                console.error('좌석 로딩 실패:', error);
            }
        };

        if (selectedScreenId) {
            fetchSeats();
        }
    }, [selectedScreenId, token]);

    const handleSeatSelect = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    useEffect(() => {
        // 선택된 좌석들의 총 금액 계산
        const total = selectedSeats.reduce((sum, seatId) => {
            const seat = seats.find(s => s.seatId === seatId);
            return seat ? sum + seat.price : sum;
        }, 0);
        setTotalPrice(total);
    }, [selectedSeats, seats]);

    const handlePayment = () => {
        if (selectedSeats.length === 0) {
            alert('최소 한 개의 좌석을 선택해주세요.');
            return;
        }
        onPayment(selectedSeats); // 부모 컴포넌트로 선택된 좌석 전달
    };

    return (
        <div className="seat-selection">
            <h3>상영 날짜: {selectedDate} | 상영 시간: {selectedTime}</h3>

            <h3>선택된 좌석:</h3>
            <div className="selected-seat-list">
                {selectedSeats.map((seatId) => {
                    const seat = seats.find(s => s.seatId === seatId);
                    return seat ? <span key={seatId}>{seat.seatNumber} </span> : null;
                })}
            </div>

            <h3>결제 금액: {totalPrice.toLocaleString()}원</h3>

            <h2>좌석 선택</h2>
            <div className="seat-container">
                {seats.map((seat) => (
                    <button
                        key={seat.seatId}
                        className={`seat ${seat.reserved ? 'reserved' : ''} ${selectedSeats.includes(seat.seatId) ? 'selected' : ''}`}
                        onClick={() => handleSeatSelect(seat.seatId)}
                        disabled={seat.reserved}
                    >
                        {seat.seatNumber}
                    </button>
                ))}
            </div>

            <button onClick={handlePayment} disabled={selectedSeats.length === 0}>결제하기</button>

            <style jsx>{`
                .seat-container {
                    display: grid;
                    grid-template-columns: repeat(8, 1fr);
                    gap: 8px;
                }
                .seat {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    background-color: #ddd;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .seat.selected {
                    background-color: #4CAF50; /* 선택된 좌석 색상 */
                    color: white;
                }
                .seat.reserved {
                    background-color: #FF6347; /* 예매된 좌석 색상 */
                    cursor: not-allowed;
                }
                .selected-seat-list {
                    margin: 10px 0;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default SeatSelection;
