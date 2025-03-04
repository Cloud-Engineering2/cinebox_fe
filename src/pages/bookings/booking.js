import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Calendar from '../../components/booking/Calendar';
import SeatSelection from '../../components/booking/SeatSelection';
import TimeSelector from '../../components/booking/TimeSelector';
import UnderBarTitle from '../../components/underBarTitle';
import '../../styles/pages/booking.css';

const Booking = () => {
    const token = localStorage.getItem('token');
    const { movieId } = useParams();
    const navigate = useNavigate();  // navigate 훅 사용

    const [movieDetails, setMovieDetails] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showSeatSelection, setShowSeatSelection] = useState(false);

    // TimeSelector에서 선택된 값들 저장
    const [selectedScreenId, setSelectedScreenId] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        const calendarDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            calendarDays.push({
                date: date,
                isAvailable: availableDates.includes(formatDate(date)),
            });
        }

        return calendarDays;
    };

    const fetchAvailableDates = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/dates`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAvailableDates(data.map(date => formatDate(new Date(date))));
        } catch (error) {
            console.error('상영 날짜 로딩 실패:', error);
        }
    };

    const fetchAvailableTimes = async (date) => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/screens?date=${date}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // 중복된 데이터를 추가하지 않도록 필터링
            const uniqueData = data.filter((screen, index, self) =>
                index === self.findIndex((t) => (
                    t.startTime === screen.startTime && t.screenName === screen.screenName
                ))
            );
            setAvailableTimes(uniqueData.map(screen => ({
                startTime: screen.startTime,
                screenName: `상영관 ${screen.auditoriumId}`,
                screenId: screen.screenId,  // screenId 추가
            })));

        } catch (error) {
            console.error('상영 시간 로딩 실패:', error);
        }
    };


    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/movies/${movieId}/dates`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error('영화 정보 로딩 실패:', error);
            }
        };

        fetchMovieDetails();
        fetchAvailableDates();
    }, [movieId, token]);

    useEffect(() => {
        if (movieDetails && availableDates.length > 0) {
            setLoading(false);
        }
    }, [movieDetails, availableDates]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        fetchAvailableTimes(formatDate(date));
    };

    const handleTimeSelect = (screenId, startTime) => {
        setSelectedScreenId(screenId);
        setSelectedTime(startTime);
        console.log(`선택된 상영관 ID: ${screenId}, 시간: ${startTime}`);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    const calendarDays = renderCalendar();

    const handleReserve = () => {
        if (!selectedDate || !selectedTime || !selectedScreenId) {
            alert('날짜와 시간, 상영관을 선택해주세요.');
            return;
        }
        setShowSeatSelection(true);
    };

    const handleGoBack = () => {
        navigate(`/detail/${movieId}`);  // 상세 페이지로 돌아가기
    };

    return (
        <>
            <UnderBarTitle title={'영화 예매'} />
            <div className="booking">
                <h1>{movieDetails.title} 예매</h1>
                <p>{movieDetails.description}</p>

                {!showSeatSelection ? (
                    <div className="layout-container">
                        <Calendar
                            currentDate={currentDate}
                            changeMonth={changeMonth}
                            calendarDays={calendarDays}
                            handleDateSelect={handleDateSelect}
                        />
                        <TimeSelector
                            availableTimes={availableTimes}
                            onSelectTime={handleTimeSelect}  // 선택된 시간과 상영관을 부모 컴포넌트에 전달
                        />
                    </div>
                ) : (
                    <SeatSelection selectedScreenId={selectedScreenId} selectedTime={selectedTime} />
                )}

                {/* "이전" 버튼을 showSeatSelection 상태와 관계없이 항상 표시 */}
                <button onClick={handleGoBack}>이전</button>

                {!showSeatSelection && (
                    <button onClick={handleReserve}>다음</button>
                )}
            </div>
        </>
    );
};

export default Booking;
