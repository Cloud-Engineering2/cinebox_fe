import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React, { useCallback } from 'react';
import useReq from '../hooks/useReq.js';
import '../styles/components/reviewList.css';
import { changeTimeFormat } from '../utils/datetime.js';
import EditModeInput from './editModeInput.js';

export default function ReviewList({ reviews, styles, doGetReviewRequest, noEdit = false, showMovieTitle = true }) {
    const { data: editReviewResponse, isLoading: isReviewEditLoading, error: editReviewsError, doRequest: doEditReviewRequest } = useReq(null, null);
    const { data: deleteReviewResponse, isLoading: isReviewDeleteLoading, error: deleteReviewsError, doRequest: doDeleteReviewRequest } = useReq(null, null);

    const editReviewHandler = useCallback(async (content, rating, review) => {
        const movieId = review.movieId;
        const reviewId = review.reviewId;

        await doEditReviewRequest(process.env.REACT_APP_REVIEW_API + `/${reviewId}`, {
            method: 'PUT',
            data: {
                userId: review.userId,
                movieId: movieId,
                content: content,
                rating: rating != null ? rating : review.rating
            }
        });
        getReviewHandler(movieId);
    }, [])
    const deleteReviewHandler = useCallback(async (review) => {
        await doDeleteReviewRequest(process.env.REACT_APP_REVIEW_API + `/${review.reviewId}`, {
            method: 'GET'
        });
        getReviewHandler(review.movieId);
    }, [])
    const getReviewHandler = useCallback((movieId) => {
        doGetReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews`, {
            method: 'GET'
        });
    }, [])

    return (
        <List sx={Object.assign({ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }, styles)}>
            {
                reviews && reviews.map(review => {
                    return <Box
                        key={`reviewBox${review.reviewId}`}
                        id={`reviewBox${review.reviewId}`}
                        className='mb-10'>
                        <Box className={`flex ${showMovieTitle ? 'jsfy-cnt-spc-btwn' : 'jsfy-cnt-rght'} fs-14 color-gray`}>
                            {showMovieTitle && <p>{review.movieTitle}</p>}
                            {review.createdAt && <p>{changeTimeFormat(review.createdAt)}</p>}
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
                                    edit: (content, rating) => editReviewHandler(content, rating, review),
                                    remove: () => deleteReviewHandler(review)
                                }}
                                //noEdit={noEdit}
                                noEdit={noEdit || !context.userId || review.userId !== context.userId} // userId가 없으면 수정 불가능
                            />
                        </Box>
                        <Divider variant="inset" component="li" sx={{ marginLeft: 0, marginBottom: 1 }} />
                    </Box>
                })
            }
        </List>
    );
}
