import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReq from '../hooks/useReq.js';
import detail from '../styles/pages/detail.css'
import MovieDetail from '../components/movieDetail.js'
import Tabs from '../components/tabs.js';
import { Box, TextField } from '@mui/material';
import ReviewList from '../components/reviewList.js';

const Detail = () => {
    const token = localStorage.getItem('token');
    const identifier = localStorage.getItem('identifier');
    const role = localStorage.getItem('role');

    const { movieId } = useParams();
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const { data: reviewResponse, isLoading: isReviewLoading, error: getReviewsError, doRequest: doGetReviewRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const { data: addReviewResponse, isLoading: isReviewAddLoading, error: addReviewsError, doRequest: doAddReviewRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, null);

    const [reviews, setReviews] = useState(null);

    useEffect(()=>{
        doGetReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },[isReviewAddLoading]);
    useEffect(()=>{
        setReviews(reviewResponse);
    },[isReviewLoading]);

    const MainInfo = ()=>{
        return <>
            <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <div>
                    <h2>대통령이 된 새디우스 로스와 재회 후, 국제적인 사건의 중심에 서개 된 샘이</h2>
                    <p>전 세계를 붉게 장악하려는 사악한 음모</p>
                </div>
                <div>
                    <p>감독: {data.director} | 장르: {data.genre} | 상영 시간: {data.runtime}분 | 등급 : {data.ratingGrade} | 개봉일: {data.releaseDate} </p>
                    <p>출연진: {data.actors}</p>
                </div>
            </div>
        </>
    }
    const AddReviewHandler = ()=>{
        const content = document.querySelector('#reviewTextField').value;
        
        if(content != null || content != undefined){
            doAddReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    movieId : movieId,
                    userId: 1,
                    rating: 5,
                    content: content
                }
            });
            document.querySelector('#reviewTextField').value = '';
        }
    }

    return <>
        <Box style={{margin : '80px 200px'}}>
            {data && [
                <MovieDetail detail={data}/>,
                <Tabs 
                tabs={[
                    {
                        content: <MainInfo/>,
                        value: '주요정보',
                    },{
                        value: '실관람평',
                        disabled: true
                    },{
                        value: '예고편/스틸컷',
                        disabled: true
                    }
                ]}
                styles={{marginBottom: 10}}/>,
                <div className='reviewBox'>
                    <div className='reviewTextField'>
                        <div className='userImg  mr-12'>
                            <img src={'/assets/User.jpeg'}/>
                        </div>
                        <TextField
                            id="reviewTextField"
                            multiline
                            rows={2}
                            maxRows={2}
                            sx={{width: '80%'}}
                        />
                        <Box className='addReviewButton' onClick={AddReviewHandler}>
                            <img src={'/assets/arrow_gray.png'}/>
                        </Box>
                    </div>
                    <div className='reviewList'>
                        {reviewResponse && <ReviewList 
                        items={reviewResponse}
                        styles={{
                            width: '98%',
                            maxWidth: 'none'
                        }}/>}
                    </div>
                </div>
            ]}
        </Box>
    </>
};

export default Detail;
