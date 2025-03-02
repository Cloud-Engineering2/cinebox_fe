import React, { useContext, useEffect, useState } from 'react';
import useReq from '../hooks/useReq.js';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {Box, Input, MenuItem, TextField} from '@mui/material';
import reviewList from '../styles/components/reviewList.css';
import EditModeInput from './editModeInput.js';
import { AppContext } from "../App.js";
import { changeTimeFormat } from '../utils/index.js';

export default function ReviewList({reviews, styles, doGetReviewRequest=()=>{}, noEdit=false, showMovieTitle=true}) {
    const {context, setContext} = useContext(AppContext);

    const { data: editReviewResponse, isLoading: isReviewEditLoading, error: editReviewsError, doRequest: doEditReviewRequest } = useReq(null, null);
    const { data: deleteReviewResponse, isLoading: isReviewDeleteLoading, error: deleteReviewsError, doRequest: doDeleteReviewRequest } = useReq(null, null);

    const editReviewHandler = async (content, rating, review)=>{
        const movieId = review.movieId;
        const reviewId = review.reviewId;

        await doEditReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${context.token}`
            },
            data:{
                userId: review.userId,
                movieId: movieId,
                content: content,
                rating: rating != null ? rating : review.rating
            }
        });
        await doGetReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        });
    }
    const deleteReviewHandler = (movieId, reviewId)=>{
        doDeleteReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews/${reviewId}`, {
            method: 'Delete',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        });
        document.querySelector(`.reviewBox${reviewId}`).remove();
    }

    return (
        <List sx={Object.assign({ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }, styles)}>
        {
            reviews && reviews.map(review =>{
                return <Box className={`reviewBox${review.reviewId} mb-18`}>
                    <Box className={`flex ${showMovieTitle ? 'jsfy-cnt-spc-btwn' : 'jsfy-cnt-rght'} mb-6 fs-14 color-gray`}>
                        {showMovieTitle && <p>movie 제목 넣기</p>}
                        <p>{changeTimeFormat(review.createdAt)}</p>
                    </Box>
                    <Box className='contentBox'>
                        <Box className='content1'>
                            <Box>{review.identifier}</Box>
                            <Box>{review.rating}</Box>
                        </Box>
                        <EditModeInput 
                            id={review.reviewId}
                            text={review.content}
                            events={{
                                edit: (content, rating)=>editReviewHandler(content, rating, review),
                                remove: ()=>deleteReviewHandler(review.movieId, review.reviewId)
                            }}
                            noEdit={noEdit}
                        />
                    </Box>
                <Divider variant="inset" component="li" sx={{marginLeft: 0, marginBottom: 1}}/>
                </Box>
            })
        }
        </List>
    );
}
