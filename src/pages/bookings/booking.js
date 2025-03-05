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
    const navigate = useNavigate();

    const [movieDetails, setMovieDetails] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showSeatSelection, setShowSeatSelection] = useState(false);  // 좌석 선택 화면을 보여주는 상태
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedScreenId, setSelectedScreenId] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);  // 선택된 좌석 상태 추가
    const [totalPrice, setTotalPrice] = useState(0);  // 결제 금액 상태 추가
    const [selectedEndTime, setSelectedEndTime] = useState(null);  // selectedEndTime 상태 추가


    const formatDate = (date) => {
        const dateObj = (date instanceof Date) ? date : new Date(date);
        return dateObj.toISOString().split('T')[0];
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
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/screens/date?date=${formatDate(date)}`, {
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
            console.log("API 응답 데이터:", data); // 이 부분을 통해 응답이 제대로 오는지 확인

            const uniqueData = data.flatMap((auditorium) => {
                if (auditorium.screens && Array.isArray(auditorium.screens)) {
                    return auditorium.screens.map((screen) => {
                        const startTime = new Date(screen.startTime);
                        const endTime = new Date(screen.endTime);

                        const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return {
                            startDate: startTime.toISOString().split('T')[0],
                            startTime: formattedStartTime,
                            endTime: formattedEndTime,
                            price: screen.price,
                            movieTitle: screen.movieTitle,
                            screenId: screen.screenId,
                            auditoriumName: auditorium.auditoriumName,
                        };
                    });
                } else {
                    return [];
                }
            });

            const uniqueTimes = [];
            const seen = new Set();

            uniqueData.forEach((item) => {
                const key = `${item.screenId}-${item.startTime}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueTimes.push(item);
                }
            });

            setAvailableTimes(uniqueTimes);
        } catch (error) {
            console.error('영화 정보 로딩 실패:', error);
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
                const uniqueData = data.flatMap((auditorium) =>
                    auditorium.screens && Array.isArray(auditorium.screens)
                        ? auditorium.screens.map((screen) => ({
                            startTime: screen.startTime,
                            endTime: screen.endTime,
                            price: screen.price,
                            movieTitle: screen.movieTitle,
                            screenId: screen.screenId,
                            auditoriumName: auditorium.auditoriumName,
                        }))
                        : []
                );

                setMovieDetails(uniqueData);
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
        const formattedDate = formatDate(date); // 날짜 포맷팅
        setSelectedDate(formattedDate); // 선택된 날짜 상태 업데이트
        console.log("선택된 날짜: ", formattedDate); // 날짜 확인

        // 상영 시간 가져오기
        fetchAvailableTimes(formattedDate);
    };

    const handleTimeSelect = (screenId, startTime, endTime, price) => {
        setSelectedScreenId(screenId);
        setSelectedTime(startTime);
        setSelectedEndTime(endTime); // endTime 값 설정
        setSelectedPrice(price);

        // 가격 확인 로그
        console.log("선택된 상영관 ID: ", screenId);
        console.log("선택된 시간: ", startTime);
        console.log("선택된 종료 시간22: ", endTime); // 추가된 로그
        console.log("선택된 가격 (Booking에서): ", price);
    };

    const handleReserve = () => {
        if (!selectedDate || !selectedTime || !selectedScreenId) {
            alert('날짜와 시간, 상영관을 선택해주세요.');
            return;
        }
        setShowSeatSelection(true);
    };


    const handleSeatSelect = (seatId) => {
        console.log("좌석 선택됨!");
        setSelectedSeats((prevSeats) => {
            const updatedSeats = prevSeats.includes(seatId)
                ? prevSeats.filter((seat) => seat !== seatId)
                : [...prevSeats, seatId];

            // selectedPrice와 totalPrice를 콘솔에 출력해보기
            console.log("Selected Price: ", selectedPrice);
            console.log("Selected Seats Length: ", updatedSeats.length);

            // selectedPrice가 유효한 값인지 확인하고 결제 금액을 계산
            if (selectedPrice && !isNaN(selectedPrice)) {
                setTotalPrice(updatedSeats.length * selectedPrice);
            } else {
                setTotalPrice(0);  // selectedPrice가 유효하지 않으면 금액을 0으로 설정
            }

            return updatedSeats;
        });
    };

    // 결제api
    const handleCompletePayment = async (paymentData) => {
        console.log('결제 요청 데이터:', paymentData);

        try {
            const response = await fetch('http://localhost:8080/api/payments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const text = await response.text();
            console.log('서버 응답 상태코드:', response.status);
            console.log('서버 응답 본문:', text);

            if (!response.ok) {
                throw new Error(`결제 실패: ${response.status}`);
            }

            alert('결제가 완료되었습니다!');
            navigate('/confirmation'); // 결제 완료 시 리다이렉트
        } catch (error) {
            console.error('결제 중 오류 발생:', error);
            alert('결제 중 문제가 발생했습니다.');
        }
    };



    const handleGoBack = () => {
        navigate(`/detail/${movieId}`);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    const calendarDays = renderCalendar();

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
                            onSelectTime={handleTimeSelect}
                        />
                    </div>
                ) : (
                    <SeatSelection
                        selectedScreenId={selectedScreenId}
                        selectedTime={selectedTime}
                        selectedDate={selectedDate}
                        selectedEndTime={selectedEndTime} // endTime 전달
                        selectedPrice={selectedPrice}
                        handleSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                        price={selectedPrice}  // 가격 전달
                        onPayment={handleCompletePayment}


                    />
                )}

                <button onClick={handleGoBack}>이전</button>

                {!showSeatSelection && (
                    <button onClick={handleReserve}>다음</button>
                )}
            </div>
        </>
    );
};


export default Booking;
