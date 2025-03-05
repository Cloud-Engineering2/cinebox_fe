import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // 예: 홈으로 돌아가기
    };

    return (
        <div>
            <h1>결제가 완료되었습니다!</h1>
            <p>예매가 성공적으로 완료되었습니다.</p>
            <button onClick={handleGoHome}>홈으로 돌아가기</button>
        </div>
    );
};

export default Confirmation;
