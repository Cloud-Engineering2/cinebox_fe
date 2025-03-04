import React, { useEffect, useState } from 'react';

const SeatSelection = ({ token, selectedTime }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedScreenId, setSelectedScreenId] = useState(65); // 기본 상영관 ID

    // 상영관 선택 처리
    const handleScreenChange = (event) => {
        setSelectedScreenId(event.target.value); // 선택한 상영관 ID로 업데이트
    };

    // 좌석 정보 가져오기
    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/api/screens/${selectedScreenId}/seats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log('Fetched seats:', data);  // 받아온 좌석 데이터 확인
                setSeats(data); // 좌석 정보 설정
            } catch (error) {
                console.error('좌석 정보를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchSeats();
    }, [selectedScreenId, token]);


    // 좌석 클릭 처리
    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            // 이미 선택된 좌석이면 취소
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            // 좌석을 선택
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    return (
        <div>
            {/* 상영관 선택 드롭다운 */}
            <select onChange={handleScreenChange} value={selectedScreenId}>
                <option value="65">Screen 65</option>
                <option value="66">Screen 66</option>
                <option value="67">Screen 67</option>
                {/* 다른 상영관 옵션들 추가 가능 */}
            </select>

            {/* 좌석 정보 출력 */}
            <div className="seat-container">
                {seats.map((seat) => (
                    <button
                        key={seat.seatId}
                        className={`seat ${seat.reserved ? 'disabled' : ''}`}  // reserved가 true일 때 disabled 클래스를 추가
                        disabled={seat.reserved}  // reserved가 true일 때 클릭 불가능
                        onClick={() => seat.reserved ? null : handleSeatClick(seat.seatId)}  // reserved가 true일 때 클릭 이벤트 무시
                    >
                        {seat.seatNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SeatSelection;
