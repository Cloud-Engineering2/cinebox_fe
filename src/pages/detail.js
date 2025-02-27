import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReq from '../hooks/useReq.js';
import detail from '../styles/pages/detail.css'
import MovieDetail from '../components/movieDetail.js'
import Tabs from '../components/tabs.js';
import { Box, TextField } from '@mui/material';
import ReviewList from '../components/reviewList.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { AppContext } from "../App.js";

const Detail = () => {
    const {context, setContext} = useContext(AppContext);
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);

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
        
        if(content != null || content != undefined){
            doAddReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${context.token}`
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
        <UnderBarTitle/>
        <Box style={{margin : '47px 25%'}}>
            {data && [
                <MovieDetail movie={data} styles={{marginBottom: 73}}/>,
                <Box className='mainInfo'>
                    <Box className='mb-73'>
                        <h2 className='fs-19 mb-14 nowrap'>{data.plot}</h2>
                        <p>전 세계를 붉게 장악하려는 사악한 음모</p>
                    </Box>
                </Box>,
                <Box className='reviewBox'>
                    <Box className='reviewTextField'>
                        <Box className='userImg  mr-12'>
                            <img src={'/assets/User.jpeg'}/>
                        </Box>
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
                    </Box>
                    <Box className='reviewList'>
                        {reviewResponse && <ReviewList 
                        items={reviewResponse}
                        styles={{
                            width: '98%',
                            maxWidth: 'none'
                        }}/>}
                    </Box>
                </Box>
            ]}
        </Box>
    </>
};

export default Detail;
