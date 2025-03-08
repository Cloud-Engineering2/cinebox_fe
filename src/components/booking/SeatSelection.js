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
                const response = await fetch(`http://127.0.0.1:8080/api/screens/${selectedScreenId}/seats`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('좌석 정보를 불러오는 데 실패했습니다.');

                const data = await response.json();
                console.log("w좌석데이터 : ", data);
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

            console.log("응답상태 확인 :  ", bookingResponse); // 응답 상태 확인

            if (!bookingResponse.ok) throw new Error('예매 생성 실패');

            const bookingData = await bookingResponse.json();
            const bookingId = bookingData.bookingId;

            // navigate로 선택한 좌석과 가격을 전달
            // selectedSeats를 문자열로 변환하여 전달
            navigate(`/bookings/${bookingId}?selectedSeats=${JSON.stringify(selectedSeats)}&totalPrice=${totalPrice}`);


        } catch (error) {
            console.error('예매 처리 중 오류:', error);
            alert('예매 처리 중 문제가 발생했습니다.');
        }
    };

    const totalSeats = seats.length;
    const availableSeats = seats.filter((seat) => !seat.reserved).length;

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];  // 예시로 A~E열까지 가정

    // Seat groupings
    const seatGroups = [
        { row: 'A', range: [1, 4] },
        { row: 'A', range: [5, 15] },
        { row: 'A', range: [16, 19] },
        { row: 'B', range: [1, 4] },
        { row: 'B', range: [5, 15] },
        { row: 'B', range: [16, 19] },
        // Add more rows and ranges as needed
    ];
    return (
        <div className="seat-container">

            <div className="screenInfo">

                <div className="flex">

                    <h3>선택된 자리:
                        {selectedSeats.length === 0 && (
                            <span className="empty-seat" > 좌석을 선택해주세요</span>
                        )}

                        {selectedSeats.map((seatId, index) => {
                            const seat = seats.find((s) => s.seatId === seatId);
                            if (!seat) return null;

                            // 마지막 항목이 아니면 ',' 추가
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
                        <h3>상영 시간:{selectedDate ? `${selectedDate} (${formatDayOfWeek(selectedDate)})` : '선택된 날짜가 없습니다.'} {selectedTime} ~ {selectedEndTime}</h3>
                        {/* <h3>총 좌석 수: {totalSeats}</h3> */}
                        <p>예약 가능한 좌석 수: {availableSeats}/{totalSeats}</p>
                    </div>

                </div>
            </div>

            <div className="screen">
                <div className="screen-line">SCREEN</div>
                <div className="seats">
                    {rows.map((row) => (
                        <div key={row} className="row">
                            <span className="row-label">{row}</span>
                            {Array.from({ length: 19 }).map((_, index) => {
                                const seatNumber = `${row}${index + 1}`;
                                const seat = seats.find(seat => seat.seatNumber === seatNumber);
                                const seatId = seat?.seatId;

                                // Grouping seats by their number ranges
                                let groupClass = '';
                                if (index + 1 >= 1 && index + 1 <= 4) {
                                    groupClass = 'group-1-4';
                                } else if (index + 1 >= 5 && index + 1 <= 15) {
                                    groupClass = 'group-5-15';
                                } else if (index + 1 >= 16 && index + 1 <= 19) {
                                    groupClass = 'group-16-19';
                                }

                                // 추가: A4, B4, C4 등 마지막 좌석에 별도의 클래스 추가
                                if (index + 1 === 4) {
                                    groupClass += ' last-seat1-4';  // last-seat 클래스를 추가
                                }
                                // 추가:
                                if (index + 1 === 16) {
                                    groupClass += ' last-seat16-19';  // last-seat 클래스를 추가
                                }


                                return (
                                    <div key={seatNumber} className={groupClass}>
                                        <button
                                            onClick={() => handleSeatSelect(seatId)}
                                            disabled={seat?.reserved}
                                            className={`seat ${seat?.reserved ? 'reserved' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                                        >
                                            {seatNumber}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <h3 className="totalprice">최종 결제 금액: {totalPrice.toLocaleString()}원</h3>
            <div className="btn-container">
                <button
                    onClick={handleBooking}
                    disabled={selectedSeats.length === 0}
                >
                    예매하기
                </button>
            </div>
        </div >
    );
};

export default SeatSelection;
