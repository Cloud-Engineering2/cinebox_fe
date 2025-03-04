import { useContext } from 'react';
import { AppContext } from '../App';

const usePayment = () => {
    const { context } = useContext(AppContext);

    const processPayment = (bookingId, totalPrice) => {
        console.log("토큰 확인: ", context.token);

        if (!context.token) {
            alert("로그인이 필요합니다!");
            return;
        }

        const IMP = window.IMP;
        if (!IMP) {
            alert("I amport 스크립트가 로드되지 않았습니다.");
            return;
        }

        IMP.init("imp25587836");

        IMP.request_pay({
            pg: "html5_inicis",
            pay_method: "card",
            name: "예약결제",
            amount: totalPrice,
            m_redirect_url: "/"
        }, async (rsp) => {
            if (rsp.success) {
                try {
                    const res = await fetch(process.env.REACT_APP_PAYMENT_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${context.token}`
                        },
                        body: JSON.stringify({
                            bookingId,
                            totalAmount: totalPrice,
                            paymentMethod: "CARD",
                            paymentId: rsp.imp_uid,
                            paymentSuccess: rsp.success,
                        })
                    });


                    if (!res.ok) {
                        throw new Error(`서버 오류: ${res.status}`);
                    }
                    const data = await res.json();
                    console.log("결제 응답: ", data);


                    if (data.paymentStatus === "COMPLETED") {
                        alert("결제가 완료되었습니다.");
                        window.location.href = "/";
                    } else {
                        alert("결제 상태 확인 실패");
                    }
                } catch (error) {
                    alert("결제 처리 중 오류 발생");
                    console.error(error);
                }
            } else {
                alert(`결제에 실패했습니다: ${rsp.error_msg}`);
            }
        });
    };

    return processPayment;
};

export default usePayment;
