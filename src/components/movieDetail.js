import { Box } from '@mui/material';
import '../styles/components/movieDetail.css';
import React, { useCallback, useContext, useEffect } from 'react';
import { AppContext } from "../App.js";
import useReq from '../hooks/useReq.js';
import { showToast } from '../utils/toast.js';

const MovieDetail = ({ movie, styles, noBookingButton = false }) => {
    const { context, setContext } = useContext(AppContext);
    const { data: updateLikeRes, isLoading: isUpdateLikeLoading, error: updateLikeError, doRequest: doUpdateLikeRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);

    useEffect(() => {
        if (updateLikeError) {
            showToast(updateLikeError.response.data.message, 'error');
        }
    }, [updateLikeError]);

    const increaseLikeCount = useCallback(async () => {
        await doUpdateLikeRequest(process.env.REACT_APP_MOVIE_API + `/${movie.movieId}/likes`, {
            method: 'POST'
        })
        window.location.reload();
    }, [])

    return <Box className="movieDetail" style={styles}>
        <Box className="movieInfo">
            <Box>
                <h2 className="title mb-18">{movie.title}</h2>
                <p className='bold'>개봉일: {movie.releaseDate} &nbsp; 상영 시간: {movie.runtime}분 &nbsp; <span style={{ color: 'orange' }}>15세이상관람가</span> </p>
            </Box>
            <Box>
                <p><span className='grayFont'>장르</span> &nbsp; {movie.genre}</p>
                <p><span className='grayFont'>감독</span> &nbsp; {movie.director}</p>
                <p><span className='grayFont'>출연</span> &nbsp; {movie.actors}</p>
            </Box>
        </Box>
        <Box className="movieImg">
            <Box className="img mb-6">
                <img src={movie.posterImageUrl ? movie.posterImageUrl : '/assets/noImage.png'} alt="image" />
            </Box>
            {!noBookingButton && <Box className='flex jsfy-cnt-spc-btwn'>
                <span className='like flex' onClick={increaseLikeCount}>
                    <img className='width-28 mr-6' src='/assets/RedHeart.png' />
                    {movie.likeCount}
                </span>
                <span className="bookingButton button-sm width-50p">
                    <a href={`/booking/${movie.movieId}`}>예매</a>
                </span>
            </Box>}
        </Box>
    </Box>
};

export default MovieDetail;