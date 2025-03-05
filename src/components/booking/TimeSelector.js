import React, { useState } from 'react';

const TimeSelector = ({ availableTimes, onSelectTime, availableSeatsCount, totalSeatsCount, selectedTime }) => {
    const [activeTime, setActiveTime] = useState(null);

    const handleTimeClick = (startTime, screenId, price, endTime) => {
        setActiveTime(activeTime === startTime ? null : startTime);
        onSelectTime(screenId, startTime, endTime, price);
    };

    const groupTimesByAuditorium = (times) => {
        return times.reduce((groups, { startTime, screenId, auditoriumName, endTime, price, movieTitle }) => {
            if (!groups[auditoriumName]) {
                groups[auditoriumName] = [];
            }
            groups[auditoriumName].push({ startTime, endTime, screenId, price, movieTitle });
            return groups;
        }, {});
    };

    const groupedTimes = groupTimesByAuditorium(availableTimes);

    return (
        <div className="times-container">
            <h3>상영 시간</h3>
            {Object.keys(groupedTimes).length > 0 ? (
                Object.keys(groupedTimes).map(auditoriumName => (
                    <div key={auditoriumName} className="auditorium-group">
                        <h4>{auditoriumName}</h4>
                        {groupedTimes[auditoriumName].map(({ startTime, endTime, screenId, price, movieTitle }) => (
                            <div key={`${startTime}-${screenId}`} className="time-button-wrapper">
                                <div className="time-details-wrapper">
                                    <button
                                        className={activeTime === startTime ? 'active' : ''}
                                        onClick={() => handleTimeClick(startTime, screenId, price, endTime)}
                                    >
                                        {startTime}
                                    </button>
                                    {/* 예약 가능한 좌석 / 총 좌석 표시 */}
                                    <span>
                                        {availableSeatsCount} / {totalSeatsCount} 좌석
                                    </span>
                                    <div>

                                        <span>{availableSeatsCount} / {totalSeatsCount} 좌석 남음</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>상영 시간이 없습니다.</p>
            )}
        </div>
    );
};

export default TimeSelector;
