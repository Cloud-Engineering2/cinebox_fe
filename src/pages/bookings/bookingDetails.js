import { CheckCircle, Circle } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Make sure to import useNavigate
import UnderBarTitle from '../../components/underBarTitle';

const BookingDetails = ({ seats }) => {
    const { bookingId } = useParams(); // URL에서 bookingId를 받아옴
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit'); // 신용카드 기본 선택
    const [agreeRefundPolicy, setAgreeRefundPolicy] = useState(false); // 환불 정책 동의 여부
    const [isLoading, setIsLoading] = useState(false); // 결제 진행 중 상태
    const [selectedSeats, setSelectedSeats] = useState([]); // selectedSeatNumbers 대신 빈 배열로 초기화
    const [paymentMap, setPaymentMap] = useState({}); // paymentMap 상태 추가
    const navigate = useNavigate(); // useNavigate를 사용

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
                console.log("서버에서 응답데이터 :", response.data);

                // 서버에서 받은 좌석 정보를 selectedSeats에 설정
                if (response.data.seatNumbers && Array.isArray(response.data.seatNumbers)) {
                    setSelectedSeats(response.data.seatNumbers);  // seatNumbers가 배열이므로 바로 설정
                    console.log('받은 좌석 정보2222:', response.data.seatNumbers);
                } else {
                    console.log('seatNumbers가 없음');
                }


            } catch (error) {
                console.error('예매 정보 불러오기 실패:', error);
                setError('예매 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchBookingDetails();
    }, [bookingId]);




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
                            // 선택된 좌석 정보도 함께 전송
                            selectedSeats
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
                                    paymentStatus: "COMPLETED",
                                },
                            }));
                            console.log("paymentMap 갱신:", paymentMap);
                            // 결제 완료 후 Confirmation.js로 리디렉션
                            navigate('/confirmation', { state: { bookingData, paymentStatus: 'COMPLETED' } });

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
            <UnderBarTitle title={'결제하기'} />

            <div className="payment-container">
                <h3>예매정보</h3>
                <div className="flex">

                    <img src={bookingData.posterImageUrl} alt={bookingData.movieTitle} width="200" />

                    <div className="pay-info">
                        <p className="title"> <strong>{bookingData.movieTitle}</strong></p>

                        <p>
                            {formatDateWithWeekday(bookingData.screenStartTime)} {formatTime(bookingData.screenStartTime)} ~ {formatTime(bookingData.screenEndTime)}
                        </p>
                        <p> {bookingData.auditoriumName}</p>
                        <p>{selectedSeats?.join(', ')}</p>
                        <p className="price"><strong>최종 결제금액: <span className="">{bookingData.totPrice.toLocaleString()}</span> </strong> 원</p>
                    </div>

                </div>
                {/* 결제 수단 선택 */}

                <h3>결제수단</h3>
                <div className="bar"></div>
                <div className="payment-method">

                    신용/체크카드
                </div>



                {/* 환불 정책 동의 체크 */}

                <div className="refund-policy-container">
                    <label className="refund-policy-label">
                        <input
                            type="checkbox"
                            checked={agreeRefundPolicy}
                            onChange={handleRefundPolicyChange}
                            className="hidden-checkbox"
                        />
                        {agreeRefundPolicy ? (
                            <CheckCircle className="checkbox-icon checked" />
                        ) : (
                            <Circle className="checkbox-icon unchecked" />
                        )}
                        <span className="policy-text">취소/환불 정책에 동의합니다.</span>
                    </label>
                </div>


                {/* <div className="refund-policy-container">
                    <label className="refund-policy-label">
                        <input
                            type="checkbox"
                            checked={agreeRefundPolicy}
                            onChange={handleRefundPolicyChange}
                            className="hidden-checkbox"
                        />
                        <span className={`checkbox-icon ${agreeRefundPolicy ? 'checked' : 'unchecked'}`}>
                            {agreeRefundPolicy ? '✅' : '☑️'}
                        </span>
                        <span className="policy-text">취소/환불 정책에 동의합니다.</span>
                    </label>
                </div> */}

                <div>
                    <p>- 온라인 예매는 영화 상영시간 20분전까지 취소 가능하며, 20분 이후 현장 취소만 가능합니다.</p>
                    <p> - 현장 취소 시 영화 상영시간 이전까지만 가능합니다.</p>
                </div>

                {selectedSeats && selectedSeats.length === 0 ? (
                    <span>좌석을 선택해주세요</span>
                ) : (
                    selectedSeats.map((seatId, index) => {
                        // seats 배열이 정의되어 있는지 확인
                        const seat = seats && seats.find((s) => s.seatId === seatId);
                        return seat ? (
                            <span key={seatId}>
                                {seat.seatNumber}
                                {index < selectedSeats.length - 1 && ', '}
                            </span>
                        ) : null;
                    })
                )}




                {/* 결제 진행 버튼 */}
                <div className="btn-container">
                    <button onClick={handleNext} disabled={isLoading}>
                        {isLoading ? '결제 중...' : '결제하기'}
                    </button>
                </div>

            </div>
        </>
    );

};

export default BookingDetails;