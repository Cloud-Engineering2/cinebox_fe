import { CheckCircle } from '@mui/icons-material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UnderBarTitle from '../../components/underBarTitle';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingData, paymentStatus } = location.state || {}; // state로 전달된 결제 정보

    if (!bookingData || !paymentStatus) {
        return <div>결제 정보가 없습니다.</div>;
    }

    const handleGoToMypage = () => {
        navigate('/mypage'); // 예매 내역 확인 페이지로 이동
    };

    const handleGoToMain = () => {
        navigate('/main'); // 메인홈으로 이동
    };



    return (
        <>
            <UnderBarTitle title={'영화 결제'} />

            {/* {paymentStatus === "COMPLETED" && (
                    <div>
                        <p>결제가 완료되었습니다.</p>
                        <p>영화 제목: {bookingData.movieTitle}</p>
                        <p>상영 시간: {bookingData.screenStartTime}</p>
                        <p>최종 결제금액: {bookingData.totPrice.toLocaleString()}원</p>

                        <div>
                            <h3>선택한 좌석:</h3>
                            {bookingData.seatNumbers && bookingData.seatNumbers.length > 0 ? (
                                <ul>
                                    {bookingData.seatNumbers.map((seat, index) => (
                                        <li key={index}>{seat}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>좌석이 선택되지 않았습니다.</p>
                            )}
                        </div>
                    </div>
                )} */}



            <div className="confirmation-container">
                <div className="icon-container">
                    <CheckCircle className="check-icon" />
                </div>
                <div>
                    <h2>결제 완료가 완료되었습니다.</h2>
                    <h2>즐거운 영화 관람 되세요!</h2>
                </div>
                <div className="buttons-container">
                    <button onClick={handleGoToMain}>메인 홈으로 이동</button>
                    <button onClick={handleGoToMypage}>예매내역확인</button>
                </div>
            </div>


        </>
    );
};

export default Confirmation;
