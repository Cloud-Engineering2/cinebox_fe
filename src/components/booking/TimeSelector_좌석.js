import React, { useEffect, useState } from 'react';

const TimeSelector = ({ availableTimes, onSelectTime, currentUserId }) => {
    const [activeTime, setActiveTime] = useState(null); // 하나의 시간만 선택
    const [seats, setSeats] = useState([]);
    const [selectedScreenId, setSelectedScreenId] = useState(null);
    const totalSeats = 100; // 예시: 상영관의 총 좌석 수
    const [reservedSeatsCount, setReservedSeatsCount] = useState(0);
    const [availableSeatsCount, setAvailableSeatsCount] = useState(0);

    // 좌석 로딩 함수
    const loadSeats = async (screenId) => {
        try {
            const response = await fetch(`http://cinebox-service.dev.svc.cluster.local:8080/api/screens/${screenId}/seats`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('좌석 정보를 불러오는 데 실패했습니다.');

            const data = await response.json();
            setSeats(data);
            console.log("좌석 데이터:", data);  // 디버깅용 출력

        } catch (error) {
            console.error('좌석 로딩 실패:', error);
        }
    };

    const handleTimeClick = (startTime, screenId, price, endTime) => {
        // 이전에 선택된 시간이 있으면 비활성화하고, 새로 클릭한 시간만 활성화
        setActiveTime(activeTime === startTime ? null : startTime);
        setSelectedScreenId(screenId);  // 선택된 화면 ID를 업데이트
        onSelectTime(screenId, startTime, endTime, price);
    };

    const getReservedSeatsCount = () => {
        // 'reserved: true'인 좌석만 필터링
        return seats.filter(seat => seat.reserved === true).length;
    };

    const getAvailableSeatsCount = () => {
        // 'reserved: false'인 좌석만 필터링하여 예약 가능한 좌석 수를 계산
        return seats.filter(seat => seat.reserved === false).length;
    };

    useEffect(() => {
        if (selectedScreenId) {
            loadSeats(selectedScreenId);  // 화면이 변경될 때마다 좌석 정보 로드
        }
    }, [selectedScreenId]);

    useEffect(() => {
        setReservedSeatsCount(getReservedSeatsCount());  // 예약된 좌석 수 계산
        setAvailableSeatsCount(getAvailableSeatsCount());  // 남은 좌석 수 계산
    }, [seats]);  // seats가 업데이트될 때마다 실행

    // 중복 시간과 상영관을 필터링
    const uniqueTimes = availableTimes.filter((time, index, self) =>
        index === self.findIndex((t) => (
            t.startTime === time.startTime && t.auditoriumName === time.auditoriumName
        ))
    );

    return (
        <div className="times-container">
            <h3>상영 시간</h3>
            {uniqueTimes.length === 0 ? (
                <p>상영 날짜를 선택해주세요.</p>
            ) : (
                uniqueTimes.map(({ startTime, endTime, screenId, price, auditoriumName }) => (
                    <div key={`${startTime}-${screenId}`} className="time-button-wrapper">
                        <div className="time-details-wrapper">
                            <h4>{auditoriumName}</h4> {/* 상영관 이름 출력 */}
                            <button
                                className={activeTime === startTime ? 'active' : ''}
                                onClick={() => handleTimeClick(startTime, screenId, price, endTime)}
                            >
                                {startTime} - {endTime}
                            </button>
                        </div>
                        {/* 예약 가능한 좌석 수 표시 */}
                        <div>
                            <h3>예약된 좌석 수: {reservedSeatsCount}</h3>
                            <h4>남은 좌석 수: {availableSeatsCount}</h4>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TimeSelector;
