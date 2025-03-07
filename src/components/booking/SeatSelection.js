import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SeatSelection = ({ selectedScreenId, selectedDate, selectedTime, selectedEndTime, onPayment, price,
    setSelectedTime,  // 추가
    setSelectedPrice,  // 추가
    setSelectedEndTime  // 추가
}) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSeatSelection, setShowSeatSelection] = useState(false);  // 좌석 선택 화면을 보여주는 상태
    const { movieId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/api/screens/${selectedScreenId}/seats`, {
                    method: 'GET',
                    credentials: 'include',
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
        const selectedSeat = seats.find((seat) => seat.seatId === seatId);
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seatId)
                ? prevSeats.filter((seat) => seat !== seatId)
                : [...prevSeats, seatId]
        );
    };



    useEffect(() => {
        if (price) {
            setTotalPrice(selectedSeats.length * price);
        }
    }, [selectedSeats, price]);


    const handleGoBack = () => {
        navigate(`/bookings/${movieId}`);
    };

    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            alert('최소 한 개의 좌석을 선택해주세요.'); // 좌석을 선택하지 않았을 때 경고 메시지
            return;
        }

        try {
            const selectedSeatNumbers = seats
                .filter((seat) => selectedSeats.includes(seat.seatId))
                .map((seat) => seat.seatNumber);

            const bookingResponse = await fetch('http://127.0.0.1:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    screenId: selectedScreenId,
                    seatNumbers: selectedSeatNumbers,
                }),
            });

            if (!bookingResponse.ok) throw new Error('예매 생성 실패');

            const bookingData = await bookingResponse.json();
            const bookingId = bookingData.bookingId;
            navigate(`/bookings/${bookingId}`);

        } catch (error) {
            console.error('예매 처리 중 오류:', error);
            alert('예매 처리 중 문제가 발생했습니다.');
        }
    };

    const totalSeats = seats.length;
    const availableSeats = seats.filter((seat) => !seat.reserved).length;

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];  // 예시로 A~E열까지 가정

    return (
        <div>
            {/* 좌석을 선택하지 않았을 때 문구 추가 */}
            {selectedSeats.length === 0 && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>좌석을 선택해주세요!</p>
            )}

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
            <div className="screen">
                <div className="screen-line"></div>
                <div className="seats">
                    {rows.map((row) => (
                        <div key={row} className="row">
                            <span className="row-label">{row}</span>
                            {Array.from({ length: 19 }).map((_, index) => {
                                const seatNumber = `${row}${index + 1}`;
                                const seat = seats.find(seat => seat.seatNumber === seatNumber);
                                return (
                                    <button
                                        key={seatNumber}
                                        onClick={() => handleSeatSelect(seat.seatId)}
                                        disabled={seat?.reserved}
                                        className={`seat ${seat?.reserved ? 'reserved' : ''} ${selectedSeats.includes(seat?.seatId) ? 'selected' : ''}`}
                                    >
                                        {seatNumber}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>



            <div className="btn-container">
                <button
                    onClick={handleBooking}
                    disabled={selectedSeats.length === 0} // 좌석이 선택되지 않으면 비활성화
                    style={{
                        backgroundColor: selectedSeats.length === 0 ? 'gray' : 'green', // 비활성화 시 색상 변경
                        cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
                    }}
                >
                    예매하기
                </button>

                {/* <button
                    className="prevBtn"
                    onClick={() => {
                        if (showSeatSelection) {
                            // 좌석 선택에서 상영 시간 선택 화면으로 돌아가기
                            setShowSeatSelection(false); // 좌석 선택 화면을 숨김
                        } else {
                            // "이전" 버튼을 누르면 상영 시간 선택 화면으로 돌아가도록
                            handleGoBack();  // 영화 선택 화면으로 돌아가기
                        }
                    }}
                >
                    이전
                </button> */}

            </div>


        </div>
    );
};

export default SeatSelection;
