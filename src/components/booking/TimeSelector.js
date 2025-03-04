import React, { useState } from 'react';

const TimeSelector = ({ availableTimes, onSelectTime }) => {
    const [activeTime, setActiveTime] = useState(null);

    const handleTimeClick = (startTime, screenId) => {
        console.log(`선택된 시간: ${startTime}`);
        console.log(`선택된 screenId: ${screenId}`);

        setActiveTime(activeTime === startTime ? null : startTime);

        // 부모 컴포넌트로 선택한 시간과 screenId 전달
        onSelectTime(screenId, startTime);
    };

    return (
        <div className="times-container">
            <h3>상영 시간</h3>
            {availableTimes.length > 0 ? (
                availableTimes.map(({ startTime, screenName, screenId }) => (
                    <div key={`${startTime}-${screenId}`} className="time-button-wrapper">
                        <button
                            className={activeTime === startTime ? 'active' : ''}
                            onClick={() => handleTimeClick(startTime, screenId)} // screenId 전달
                        >
                            {startTime}
                        </button>
                        <span>{screenName}</span>
                    </div>
                ))
            ) : (
                <p>상영 시간이 없습니다.</p>
            )}
        </div>
    );
};

export default TimeSelector;
