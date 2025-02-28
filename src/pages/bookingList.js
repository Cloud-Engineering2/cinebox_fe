import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import useReq from '../hooks/useReq'; // API 요청 훅

const BookingList = () => {
    const { context } = useContext(AppContext)
    console.log("context :", context);
    const [bookings, setBookings] = useState([]);

    // ✅ API 요청 (초기 로딩 시 자동 호출)
    const { data, isLoading, error } = useReq('http://localhost:8080/api/bookings/my', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 로컬스토리지에서 토큰 가져오기
        }
    });

    // ✅ API 응답 데이터 처리
    useEffect(() => {
        console.log("로컬스토리지 토큰:", localStorage.getItem("token"));
        console.log("API 응답 데이터: ", data);

        if (Array.isArray(data)) {
            setBookings(data); // 데이터가 배열이면 상태 업데이트
        } else {
            setBookings([]); // 비정상 응답 시 빈 배열로 초기
        }
    }, [data]);

    // 결제 처리

    const processPayment = async (bookingId, totalPrice) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("로그인이 필요합니다!");
            return;
        }
        // 사용자 정보
        const userEmail = context.email;
        const userName = context.name;

        // PG 결제 로직 (간단히 설명)
        const IMP = window.IMP;

        if (!IMP) {
            alert("I amport 스크립트가 로드되지 않았습니다.");
            return;
        }

        IMP.init("imp25587836"); // 결제 서비스 제공자와 API 키

        IMP.request_pay({
            pg: "html5_inicis", // 결제 서비스 제공자
            pay_method: "card", // 결제 방법
            name: "예약결제", // 결제 항목명
            amount: totalPrice, // 결제 금액
            // buyer_email: userEmail, // 사용자 이메일
            // buyer_name: userName, // 사용자 이름
            m_redirect_url: "/", // 결제 후 리다이렉트 URL
        }, (rsp) => {
            if (rsp.success) {
                // 결제 성공 후 서버에 결제 정보를 전송
                fetch('http://localhost:8080/api/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // JWT 토큰 포함
                    },
                    body: JSON.stringify({
                        bookingId: bookingId,
                        totalAmount: totalPrice,
                        paymentMethod: "CARD", // 결제 방법
                        paymentId: rsp.imp_uid, // 결제 고유 ID
                        paymentSuccess: rsp.success, // 결제 성공 여부
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("결제 성공 후 서버 응답:", data);
                        if (data.paymentStatus === "COMPLETED") {
                            alert("결제가 완료되었습니다.");
                            window.location.href = "/";
                            // 결제 완료 후 추가 로직 (예: 화면 갱신)
                        } else {
                            alert("결제 상태를 확인할 수 없습니다. 오류 발생");
                        }
                    })
                    .catch(error => {
                        console.error("결제 요청 중 오류 발생:", error);
                        alert("결제 요청 실패");
                    });
            } else {
                alert('결제에 실패했습니다. 오류 메시지: ' + rsp.error_msg);
                console.error('결제 실패 응답:', rsp);
            }
        });
    };




    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <div>
            <h1>예매 목록</h1>
            {bookings.length === 0 ? (

                <p>예매한 목록이 없습니다.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>예매 ID</th>
                            <th>영화 제목</th>
                            <th>상영관</th>
                            <th>좌석 번호</th>
                            <th>총 금액 (₩)</th>
                            <th>상영 시작 시간</th>
                            <th>예매일</th>
                            <th>상태</th>
                            <th>결제</th> {/* 결제 버튼 열 추가 */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.bookingId}>
                                <td>{booking.bookingId}</td>
                                <td>{booking.movieTitle}</td>
                                <td>{booking.auditoriumName}</td>
                                <td>{Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : '정보 없음'}</td>
                                <td>{new Intl.NumberFormat('ko-KR').format(booking.totPrice)} 원</td>
                                <td>{new Date(booking.screenStartTime).toLocaleString()}</td>
                                <td>{new Date(booking.bookingAt).toLocaleString()}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status === "PENDING" && (
                                        <button onClick={() => processPayment(booking.bookingId, booking.totPrice)}>
                                            결제하기
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingList;
