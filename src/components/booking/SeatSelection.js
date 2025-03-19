import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SeatSelection = ({ selectedScreenId, selectedDate, selectedTime, selectedEndTime, onPayment, price, formatDayOfWeek,
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
                const response = await fetch(`${process.env.REACT_APP_SCREEN_API}/${selectedScreenId}/seats`, {

                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('좌석 정보를 불러오는 데 실패했습니다.');

                const data = await response.json();
                console.log("좌석 데이터: ", data);
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
        console.log("결제 요청 전에 selectedSeats:", selectedSeats);
        console.log("결제 요청 전에 totPrice:", totalPrice);

        try {
            const selectedSeatNumbers = seats
                .filter((seat) => selectedSeats.includes(seat.seatId))
                .map((seat) => seat.seatNumber);

            const bookingResponse = await fetch(process.env.REACT_APP_BOOKING_API, {

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

            console.log("응답상태 확인 :  ", bookingResponse); // 응답 상태 확인

            if (!bookingResponse.ok) throw new Error('예매 생성 실패');

            const bookingData = await bookingResponse.json();
            const bookingId = bookingData.bookingId;

            // navigate로 선택한 좌석과 가격을 전달
            // selectedSeats를 문자열로 변환하여 전달
            navigate(`/bookings/${bookingId}`);
        } catch (error) {
            console.error('예매 처리 중 오류:', error);
            alert('예매 처리 중 문제가 발생했습니다.');
        }
    };

    // 좌석 그룹화 없이 그냥 모든 좌석을 이어서 출력하도록 변경
    const rows = [...new Set(seats.map(seat => seat.seatNumber.charAt(0)))]; // 각 좌석 번호의 첫 문자로 행 구분 (예: A, B, C...)

    return (
        <div className="seat-container">
            <div className="screenInfo">
                <div className="flex">
                    <h3>선택된 자리:
                        {selectedSeats.length === 0 && (
                            <span className="empty-seat"> 좌석을 선택해주세요</span>
                        )}
                        {selectedSeats.map((seatId, index) => {
                            const seat = seats.find((s) => s.seatId === seatId);
                            if (!seat) return null;

                            const isLast = index === selectedSeats.length - 1;
                            return (
                                <span className="selectSeat" key={seatId}>
                                    {seat.seatNumber}
                                    {!isLast && ', '}
                                </span>
                            );
                        })}
                    </h3>
                    <div>
                        <h3>상영 시간: {selectedDate ? `${selectedDate} (${formatDayOfWeek(selectedDate)})` : '선택된 날짜가 없습니다.'} {selectedTime} ~ {selectedEndTime}</h3>
                        <p>예약 가능한 좌석 수: {seats.filter((seat) => !seat.reserved).length}/{seats.length}</p>
                    </div>
                </div>
            </div>

            <div className="screen">
                <div className="screen-line">SCREEN</div>
                <div className="seats">
                    {/* 각 행에 대한 좌석들을 이어서 출력 */}
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            <span className="row-label">{row}</span>
                            {seats
                                .filter(seat => seat.seatNumber.charAt(0) === row) // 각 행에 해당하는 좌석들만 필터링
                                .map(seat => {
                                    const seatId = seat.seatId;
                                    return (
                                        <button
                                            key={seat.seatNumber}
                                            onClick={() => handleSeatSelect(seatId)}
                                            disabled={seat.reserved}
                                            className={`seat ${seat.reserved ? 'reserved' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                                        >
                                            {seat.seatNumber}
                                        </button>
                                    );
                                })}
                        </div>
                    ))}
                </div>
            </div>
            <h3 className="totalprice">최종 결제 금액: {totalPrice.toLocaleString()}원</h3>
            <div className="btn-container">
                <button onClick={handleBooking} disabled={selectedSeats.length === 0}>예매하기</button>
            </div>
        </div >
    );
};

export default SeatSelection;
