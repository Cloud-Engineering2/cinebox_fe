//달력컴포넌트
import React from 'react';


const Calendar = ({ currentDate, changeMonth, calendarDays, handleDateSelect }) => (
    <div className="calendar-container">
        <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>&lt; 이전</button>
            <div>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</div>
            <button onClick={() => changeMonth(1)}>&gt; 다음</button>
        </div>
        <div className="days">
            {calendarDays.map(({ date, isAvailable }) => (
                <button
                    key={date.toISOString()}
                    className={isAvailable ? 'available' : 'unavailable'}
                    onClick={() => {
                        if (isAvailable) {
                            const formattedDate = date.toISOString().split('T')[0];
                            console.log(`선택된 날짜22: ${formattedDate}`);  // 디버깅을 위한 로그
                            handleDateSelect(formattedDate);  // 포맷된 날짜 전달
                        }
                    }}
                    disabled={!isAvailable}
                >
                    {date.getDate()}
                </button>
            ))}
        </div>
    </div>
);

export default Calendar;
