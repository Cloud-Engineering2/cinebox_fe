import React, { useEffect, useState } from 'react';
import detail from '../styles/components/movieDetail.css';

const MovieDetail = ({movie, styles}) => {

    return <>
        <div className="movieDetail" style={styles}>
            <div className="movieInfo">
                <div>
                    <h2 className="title mb-18">{movie.title}</h2>
                    <p className='bold'>개봉일: {movie.releaseDate} &nbsp; 상영 시간: {movie.runtime}분 &nbsp; <span style={{color:'orange'}}>15세이상관람가</span> </p>
                </div>
                <div>
                    <p><span className='grayFont'>장르</span> &nbsp; {movie.genre}</p>
                    <p><span className='grayFont'>감독</span> &nbsp; {movie.director}</p>
                    <p><span className='grayFont'>출연</span> &nbsp; {movie.actors}</p>
                </div>
            </div>
            <div className="movieImg">
                <div className="img mb-6">
                    <img src={movie.posterImageUrl} alt="image" />
                </div>
                <div className="bookingButton button-sm">
                    <a href={`/booking/${movie}`}>이 영화 예매</a>
                </div>
            </div>
        </div>
    </>
};

export default MovieDetail;
