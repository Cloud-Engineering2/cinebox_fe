import React, { useEffect, useState } from 'react';
import detail from '../styles/components/movieDetail.css';

const MovieDetail = ({detail}) => {

    return <>
        <div className="movieDetail">
            <div className="movieInfo">
                <div>
                    <h2 className="title">{detail.title}</h2>
                    <p className="plot">{detail.plot}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <div className="mr-20">
                        <p className="fs-12">실관람 평점</p>
                        <p>8.3</p>
                    </div>
                    <div className="mr-20">
                        <p className="fs-12">예매율</p>
                        <p>3위</p>
                    </div>
                    <div className="mr-20">
                        <p className="fs-12">누적관계수</p>
                        <p>851,715</p>
                    </div>
                </div>
            </div>
            <div className="movieImg">
                <div className="img">
                    {/* <img src="https://www.bing.com/images/blob?bcid=r6CgZUr0sCYIlQ" alt="image" /> */}
                </div>
                <button type="button" className="button-sm mb-6">예매</button>
            </div>
        </div>
    </>
};

export default MovieDetail;
