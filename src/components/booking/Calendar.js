// Calendar.js
const Calendar = ({ currentDate, changeMonth, calendarDays, handleDateSelect, selectedDate }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];


    const formatDate = (date) => {
        // 'YYYY-MM-DD' 형식으로 변환
        const dateObj = (date instanceof Date) ? date : new Date(date);
        return dateObj.toLocaleDateString('en-CA');  // 'YYYY-MM-DD' 형식으로 반환 (한국 시간 기준)
    };

    const handleDateClick = (date) => {
        // 날짜를 00:00:00으로 설정
        date.setHours(0, 0, 0, 0);

        const formattedDate = formatDate(date); // 'YYYY-MM-DD' 형식
        handleDateSelect(formattedDate); // 부모 컴포넌트로 선택된 날짜 전달
    };

    const getCalendarGrid = () => {
        const calendarGrid = [];
        let dayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 해당 월의 첫 번째 날의 요일

        // 비어 있는 공간 채우기 (첫날이 월요일이면 그 앞의 일요일부터 시작)
        for (let i = 0; i < dayOfWeek; i++) {
            calendarGrid.push(null); // 빈 공간
        }

        // 해당 월의 모든 날짜를 배열에 추가
        calendarDays.forEach(({ date }) => {
            calendarGrid.push(date);
        });

        return calendarGrid;
    };

    return (
        <div className="calendar-container">
            <h3>상영 날짜</h3>
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>&lt; 이전</button>
                <div>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</div>
                <button onClick={() => changeMonth(1)}>&gt; 다음</button>
            </div>

            {/* 요일을 고정적으로 한 줄에 표시 */}
            <div className="day-names">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-name">{day}</div>
                ))}
            </div>

            {/* 날짜를 그리드로 배치 */}
            <div className="days">
                {getCalendarGrid().map((date, index) => {
                    if (!date) {
                        return <div key={index} className="empty-day"></div>; // 비어있는 공간
                    }

                    // 날짜를 00:00:00으로 설정
                    const dateAtMidnight = new Date(date);
                    dateAtMidnight.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정

                    const isPast = dateAtMidnight < today; // 오늘 이전인지 확인
                    const formattedDate = formatDate(dateAtMidnight); // 'YYYY-MM-DD' 형식

                    return (
                        <button
                            key={dateAtMidnight.toISOString()}
                            className={`calendarBtn ${isPast ? 'past' : ''} ${selectedDate === formattedDate ? 'selected' : ''}`}
                            onClick={() => {
                                if (!isPast) {
                                    handleDateClick(dateAtMidnight);
                                }
                            }}
                            disabled={isPast} // 지난 날짜 비활성화
                        >
                            {dateAtMidnight.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
