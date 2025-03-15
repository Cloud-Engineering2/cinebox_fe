import React, { useEffect, useState } from 'react';

const TimeSelector = ({ availableTimes, onSelectTime, selectedDate }) => {
    const [selectedTime, setSelectedTime] = useState(null); // 하나의 상영 시간만 선택하도록 변경
    const [seats, setSeats] = useState([]);

    // 좌석 로딩 함수
    const loadSeats = async (screenId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SCREEN_API}/${screenId}/seats`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('좌석 정보를 불러오는 데 실패했습니다.');

            const data = await response.json();
            setSeats(data);
            console.log("좌석 데이터:", data);

        } catch (error) {
            console.error('좌석 로딩 실패:', error);
        }
    };

    const handleTimeClick = (auditoriumName, startTime, screenId, price, endTime) => {
        // startTime과 endTime을 'YYYY-MM-DD' 형식으로 변환
        const startDate = new Date(startTime).toLocaleDateString();
        const selectedDateFormatted = new Date(selectedDate).toLocaleDateString(); // 선택된 날짜도 형식을 맞추기

        // 선택된 날짜와 상영 날짜가 일치하는지 확인
        if (startDate === selectedDateFormatted) {
            const newSelectedTime = {
                auditoriumName,
                startTime,
                screenId,
                endTime,
                price
            };

            setSelectedTime(newSelectedTime);
            onSelectTime(screenId, startTime, endTime, price);
        }
    };

    // selectedTime이 변경될 때 좌석 로딩
    useEffect(() => {
        if (selectedTime?.screenId) {
            loadSeats(selectedTime.screenId);
        }
    }, [selectedTime]);

    // 상영관 이름을 기준으로 그룹화
    const groupedTimes = availableTimes.reduce((groups, time) => {
        if (!groups[time.auditoriumName]) {
            groups[time.auditoriumName] = [];
        }
        groups[time.auditoriumName].push(time);
        return groups;
    }, {});

    return (
        <div className="times-container">
            <h3>상영 시간</h3>
            {Object.keys(groupedTimes).length === 0 ? (
                <p>상영 날짜를 선택해주세요.</p>
            ) : (
                Object.keys(groupedTimes).map((auditoriumName) => {
                    const times = groupedTimes[auditoriumName];
                    const totalSeats = times[0]?.totalSeats;
                    return (
                        <div key={auditoriumName} className="auditorium-group">
                            <h4>{auditoriumName} / <span>총 {totalSeats} 석</span></h4>
                            <div className="time-button-wrapper">
                                {times.map(({ startTime, endTime, screenId, price, totalSeats, availableSeats }) => (
                                    <div key={`${startTime}-${screenId}`} className="time-details-wrapper">
                                        <button
                                            className={selectedTime?.screenId === screenId ? 'active' : ''}
                                            onClick={() => handleTimeClick(auditoriumName, startTime, screenId, price, endTime)}
                                            disabled={selectedTime?.screenId === screenId} // 이미 선택된 경우 비활성화
                                        >
                                            {startTime}
                                        </button>
                                        {/* <p>{availableSeats}/{totalSeats}</p> */}
                                        <p>{availableSeats}석</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TimeSelector;
