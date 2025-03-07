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
        // 결제가 완료된 상태에서 마이페이지로 이동
        navigate('/mypage');
    };

    return (
        <>
            <UnderBarTitle title={'영화 결제'} />
            <div>
                <h1>결제 완료</h1>
                {paymentStatus === "COMPLETED" && (
                    <div>
                        <p>결제가 완료되었습니다.</p>
                        <p>영화 제목: {bookingData.movieTitle}</p>
                        <p>상영 시간: {bookingData.screenStartTime}</p>
                        <p>최종 결제금액: {bookingData.totPrice.toLocaleString()}원</p>

                        {/* 예매내역확인 버튼 클릭 시 마이페이지로 이동 */}
                        <button onClick={handleGoToMypage}>예매내역확인</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Confirmation;
