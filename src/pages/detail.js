import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReq from '../hooks/useReq.js';
import detail from '../styles/pages/detail.css'
import MovieDetail from '../components/movieDetail.js'
import { Box, TextField } from '@mui/material';
import ReviewList from '../components/reviewList.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { AppContext } from "../App.js";

const Detail = () => {
    const {context, setContext} = useContext(AppContext);
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}`, {
        method: 'GET',
        headers: {
                'Authorization': `Bearer ${context.token}`
        }
    });
    const { data: reviewResponse, isLoading: isReviewLoading, error: getReviewsError, doRequest: doGetReviewRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
        method: 'GET',
        headers: {
                'Authorization': `Bearer ${context.token}`
        }
    });
    const { data: addReviewResponse, isLoading: isReviewAddLoading, error: addReviewsError, doRequest: doAddReviewRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, null);

    useEffect(()=>{
        doGetReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        });
    },[isReviewAddLoading]);
    useEffect(()=>{
        setReviews(reviewResponse);
    },[isReviewLoading]);
    
    const AddReviewHandler = ()=>{
        const content = document.querySelector('#reviewTextField').value;
        const rating = document.querySelector('#rating').value;

        if(content != null || content != undefined || rating != ''){
            doAddReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${context.token}`
                },
                data: {
                    movieId : movieId,
                    userId: context.userId,
                    rating: rating,
                    content: content
                }
            });
            document.querySelector('#reviewTextField').value = '';
        }
    }

    return <>
        <UnderBarTitle/>
        <Box style={{margin : '47px 25%'}}>
            {data && [
                <MovieDetail movie={data} styles={{marginBottom: 73}}/>,
                <Box className='mainInfo'>
                    <Box className='mb-73'>
                        <p className='fs-19 mb-14'>{data.plot}</p>
                    </Box>
                </Box>,
                <Box className='reviewBox'>
                    <h2 className='fs-19 mb-18'>관객들의 리뷰</h2>
                    <Box className='fs-19 mb-6'>
                        <select id="rating" class="selectRating">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </Box>    
                    <Box className='reviewTextField mb-18'>
                        <TextField
                            id="reviewTextField"
                            placeholder='리뷰를 입력해주세요.'
                            multiline
                            rows={2}
                            maxRows={2}
                            sx={{width: '95%'}}
                        />
                        <Box className='addReviewButton' onClick={AddReviewHandler}>
                            <img src={'/assets/arrow_gray.png'}/>
                        </Box>
                    </Box>
                    <Box className='reviewList'>
                        {reviewResponse && <ReviewList 
                        reviews={reviewResponse.slice().reverse()}
                        styles={{
                            width: '98%',
                            maxWidth: 'none',
                            height: 30
                        }}
                        doGetReviewRequest={doGetReviewRequest}
                        showMovieTitle={false}/>}
                    </Box>
                </Box>
            ]}
        </Box>
    </>
};

export default Detail;
