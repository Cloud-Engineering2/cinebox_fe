import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UnderBarTitle from '../../components/underBarTitle';


const Booking = () => {
    const token = localStorage.getItem('token');
    const identifier = localStorage.getItem('identifier');
    const role = localStorage.getItem('role');

    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        // 영화 ID로 영화 정보를 API에서 가져오기
        fetch(`/api/movies/${movieId}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieDetails(data);
            })
            .catch((error) => {
                console.error('영화 정보 로딩 실패:', error);
            });
    }, [movieId]);

    if (!movieDetails) {
        return <div>로딩 중...</div>;  // 영화 정보를 로딩 중일 때 표시
    }

    return (
        <>
            <UnderBarTitle title={'영화 예매'} />
            <div className="booking">
                <h1>{movieDetails.title} 예매</h1>
                <p>{movieDetails.description}</p>
                <p>상영 시간: {new Date(movieDetails.screenStartTime).toLocaleString()}</p>
                <p>상영 종료 시간: {new Date(movieDetails.screenEndTime).toLocaleString()}</p>

                {/* 예매 폼 또는 좌석 선택 등의 예매 기능을 추가할 수 있습니다 */}
            </div>
        </>
    );
};

export default Booking;