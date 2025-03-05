import React, { useState } from 'react';

const TimeSelector = ({ availableTimes, onSelectTime }) => {
    const [activeTime, setActiveTime] = useState(null);

    const handleTimeClick = (startTime, screenId, price, endTime) => {
        console.log(`선택된 시간: ${startTime}`);
        console.log(`선택된 종료 시간: ${endTime}`);  // 종료 시간도 로그로 확인
        console.log(`선택된 screenId: ${screenId}`);
        console.log(`선택된 가격: ${price}`);

        setActiveTime(activeTime === startTime ? null : startTime);

        // 부모 컴포넌트로 선택한 시간, screenId, price, endTime 전달
        onSelectTime(screenId, startTime, endTime, price); // onSelectTime에 screenId, startTime, endTime, price 전달
    };

    const getUniqueTimes = (times) => {
        const uniqueTimes = [];
        const seen = new Set();

        times.forEach(({ startTime, screenId, auditoriumName, endTime, price, movieTitle }) => {
            const key = `${auditoriumName}-${startTime}`;

            if (!seen.has(key)) {
                seen.add(key);
                uniqueTimes.push({ startTime, endTime, auditoriumName, screenId, price, movieTitle });
            }
        });

        return uniqueTimes;
    };

    const uniqueAvailableTimes = getUniqueTimes(availableTimes);

    return (
        <div className="times-container">
            <h3>상영 시간</h3>
            {uniqueAvailableTimes.length > 0 ? (
                uniqueAvailableTimes.map(({ startTime, endTime, auditoriumName, screenId, price, movieTitle }) => (
                    <div key={`${startTime}-${screenId}`} className="time-button-wrapper">
                        <button
                            className={activeTime === startTime ? 'active' : ''}
                            onClick={() => handleTimeClick(startTime, screenId, price, endTime)} // screenId, startTime, price, endTime 전달
                        >
                            {startTime} - {endTime}
                        </button>
                        <span>{auditoriumName} ({movieTitle})</span>
                        <span>{price}원</span>
                    </div>
                ))
            ) : (
                <p>상영 시간이 없습니다.</p>
            )}
        </div>
    );
};

export default TimeSelector;
