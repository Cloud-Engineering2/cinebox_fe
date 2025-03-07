import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Make sure to import useNavigate
import UnderBarTitle from '../../components/underBarTitle';

const BookingDetails = () => {
    const { bookingId } = useParams(); // URL에서 bookingId를 받아옴
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit'); // 신용카드 기본 선택
    const [agreeRefundPolicy, setAgreeRefundPolicy] = useState(false); // 환불 정책 동의 여부
    const [isLoading, setIsLoading] = useState(false); // 결제 진행 중 상태
    const navigate = useNavigate(); // useNavigate를 사용
    const [paymentMap, setPaymentMap] = useState({}); // paymentMap 상태 추가

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/bookings/${bookingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // 쿠키 자동 전송을 위해 설정
                });
                setBookingData(response.data);
            } catch (error) {
                console.error('예매 정보 불러오기 실패:', error);
                setError('예매 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleRefundPolicyChange = (e) => {
        setAgreeRefundPolicy(e.target.checked);
    };


    const handleNext = async () => {
        if (!bookingData) {
            alert('예매 정보를 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
            return;
        }

        if (bookingData.status === 'PAID') {
            alert('이미 결제 완료된 예약입니다.');
            return;
        }

        if (!agreeRefundPolicy) {
            alert('취소/환불 정책에 동의해야 합니다.');
            return;
        }

        setIsLoading(true);

        try {

            const userResponse = await axios.get('http://127.0.0.1:8080/api/users/my', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // 쿠키 자동 전송을 위해 설정
            });
            console.log('사용자 응답 데이터:', userResponse.data); // 데이터 확인


            const user = userResponse.data;
            if (!user) {
                alert('사용자 정보를 가져올 수 없습니다.');
                return;
            }


            const IMP = window.IMP;
            IMP.init("imp25587836");

            IMP.request_pay({
                pg: "html5_inicis",
                pay_method: paymentMethod === 'credit' ? 'card' : 'bank',
                name: "예약결제",
                amount: bookingData.totPrice,
                buyer_email: user.email,
                buyer_name: user.name,
                m_redirect_url: "/",
            }, async (rsp) => {
                if (rsp.success) {
                    try {
                        const paymentResponse = await axios.post('http://127.0.0.1:8080/api/payments', {
                            bookingId,
                            totalAmount: bookingData.totPrice,
                            paymentMethod,
                            paymentId: rsp.imp_uid,
                            paymentSuccess: rsp.success,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            withCredentials: true, // 쿠키 자동 전송을 위해 설정
                        });

                        console.log("결제 성공 후 서버 응답:", paymentResponse.data);

                        // 결제 상태 확인을 위한 후속 요청
                        const paymentStatus = paymentResponse.data.status;

                        if (paymentStatus === "COMPLETED") {
                            alert("결제가 완료되었습니다.");

                            // 결제 정보를 전역 객체에 저장
                            setPaymentMap((prevMap) => ({
                                ...prevMap,
                                [bookingId]: {
                                    paymentId: paymentResponse.data.paymentId,
                                    amount: bookingData.totPrice,
                                    paymentStatus: "COMPLETED", // 강제로 'COMPLETED' 처리
                                },
                            }));
                            console.log("paymentMap 갱신:", paymentMap);
                            navigate(`/bookings/${bookingId}`);
                        } else {
                            alert("결제 상태를 확인할 수 없습니다. 오류 발생");
                        }
                    } catch (error) {
                        console.error("결제 요청 중 오류 발생:", error);
                        alert("결제 요청 실패");
                    }
                } else {
                    alert('결제에 실패했습니다. 오류 메시지: ' + rsp.error_msg);
                    console.error('결제 실패 응답:', rsp);
                }

                setIsLoading(false);
            });
        } catch (error) {
            console.error('결제 처리 실패:', error);
            alert('결제 처리에 실패했습니다.');
            setIsLoading(false);
        }
    };




    if (error) {
        return <div>{error}</div>;
    }

    if (!bookingData) {
        return <div>로딩 중...</div>;
    }

    // 날짜를 'yyyy-MM-dd (요일)' 형식으로 포맷하는 함수
    const formatDateWithWeekday = (dateTime) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'long' // 요일을 포함
        };
        return new Date(dateTime).toLocaleString('ko-KR', options); // 날짜와 요일 포함
    };

    // 시간을 'HH:mm' 형식으로 포맷하는 함수
    const formatTime = (dateTime) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleString('ko-KR', options).split(' ')[1]; // 시간만 반환
    };

    return (
        <>
            <UnderBarTitle title={'영화 결제'} />

            <div className="payment-container">

                <div>
                    <p><strong>영화 제목:</strong> {bookingData.movieTitle}</p>
                    <p><strong>포스터:</strong> <img src={bookingData.posterImageUrl} alt={bookingData.movieTitle} width="200" /></p>

                    <p>
                        <strong>상영 일자:</strong> {formatDateWithWeekday(bookingData.screenStartTime)}
                        <strong>상영 시간:</strong> {formatTime(bookingData.screenStartTime)} ~ {formatTime(bookingData.screenEndTime)}
                    </p>

                    <p><strong>상영관 이름:</strong> {bookingData.auditoriumName}</p>
                    <p><strong>선택된 좌석:</strong> {bookingData.seatNumbers.join(', ')}</p>
                    <p><strong>최종 결제금액:</strong> {bookingData.totPrice.toLocaleString()}원</p>

                    {/* 결제 수단 선택 */}
                    <div>
                        <h3>결제수단</h3>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={handlePaymentMethodChange}
                            />
                            신용/체크카드
                        </label>
                    </div>

                    {/* 환불 정책 동의 체크 */}
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={agreeRefundPolicy}
                                onChange={handleRefundPolicyChange}
                            />
                            취소/환불 정책에 동의합니다.
                        </label>
                    </div>

                    {/* 결제 진행 버튼 */}
                    <div className="btn-container">
                        <button onClick={handleNext} disabled={isLoading}>
                            {isLoading ? '결제 중...' : '결제하기'}
                        </button>
                    </div>




                </div>


            </div>
        </>
    );

};

export default BookingDetails;