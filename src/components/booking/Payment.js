// import React from 'react';

// const Payment = ({ selectedScreenId, selectedTime, selectedSeats, price, onCompletePayment }) => {
//     const handlePayment = () => {
//         // 결제 데이터 생성
//         const paymentData = {
//             seats: selectedSeats,
//             screenId: selectedScreenId,
//             time: selectedTime,
//             totalPrice: price,
//         };

//         // 결제 완료 함수 호출
//         onCompletePayment(paymentData);
//     };

//     return (
//         <div className="payment">
//             <h2>결제 정보</h2>
//             <p>상영관 ID: {selectedScreenId}</p>
//             <p>선택된 시간: {selectedTime}</p>
//             <p>선택된 좌석: {selectedSeats.join(', ')}</p>
//             <p>총 결제 금액: {price} 원</p>

//             <button onClick={handlePayment}>결제하기</button>
//         </div>
//     );
// };

// export default Payment;
