import React, { useState } from 'react';

const Calendar = ({ currentDate, changeMonth, calendarDays, handleDateSelect }) => {
    const today = new Date(); // 오늘 날짜

    // 요일 배열 (일~토)
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    // 선택된 날짜 상태 추가
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
        console.log(`선택된 날짜: ${formattedDate}`);
        handleDateSelect(formattedDate);
    };

    return (
        <div className="calendar-container">
            <h3>상영 날짜</h3>
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>&lt; 이전</button>
                <div>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</div>
                <button onClick={() => changeMonth(1)}>&gt; 다음</button>
            </div>

            {/* 요일을 한 번만 출력 */}
            <div className="day-names">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-name">{day}</div>
                ))}
            </div>

            {/* 날짜 출력 */}
            <div className="days">
                {calendarDays.map(({ date, isAvailable }) => {
                    const isPast = date < today.setHours(0, 0, 0, 0); // 오늘 이전인지 확인
                    const formattedDate = date.toISOString().split('T')[0];

                    return (
                        <button
                            key={date.toISOString()}
                            className={`calendarBtn ${isAvailable ? 'available' : 'unavailable'} ${isPast ? 'past' : ''} ${selectedDate === formattedDate ? 'selected' : ''}`}
                            onClick={() => {
                                if (isAvailable && !isPast) {
                                    handleDateClick(date);
                                }
                            }}
                            disabled={!isAvailable || isPast} // 지난 날짜 비활성화
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
