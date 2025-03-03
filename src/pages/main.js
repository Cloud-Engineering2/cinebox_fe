import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../hooks/useReq.js';
import MainStyle from '../styles/pages/main.css';
import MovieCard from '../components/movieCard.js';
import EmptyBox from '../components/emptyBox.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { AppContext } from "../App.js";
import { Box } from '@mui/material';

const Main = () => {
    const { context, setContext } = useContext(AppContext);
    const [movies, setMovies] = useState([]);
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${context.token}`
        }
    });

    useEffect(() => {
        if (data != null) setMovies(data);
    }, [data])

    const searchMoviesList = useCallback(() => {
        doRequest(process.env.REACT_APP_MOVIE_API, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`
            },
            params: {
                'sort': document.querySelector('#sortingSelectBox').value,
                'search': document.querySelector('#searchBox').value
            }
        })
    },[context.token])

    return <Box className='pstn-relative'>
        <UnderBarTitle title={'박스오피스'} />
        <Box className='flex pstn-absolute' style={{ top: 0, right: 44 }}>
            <select id="sortingSelectBox" className="mr-7" onChange={searchMoviesList}>
                <option value="" selected>정렬</option>
                <option value="title">제목</option>
                <option value="" disabled>예매율</option>
            </select>
            <input id="searchBox" className='mr-7' placeholder="텍스트를 입력하세요" onChange={searchMoviesList} />
        </Box>
        <Box className='movieListWraper'>
            <Box className='movieList'>
                {
                    movies ? movies.map((movie, idx) => {
                        return (
                            <MovieCard
                                key={`main_moviecard_${movie.movieId}`}
                                number={idx + 1}
                                movie={movie}
                                imgUrl={movie.posterImageUrl ? movie.posterImageUrl : '/assets/noImage.png'}
                                styles={{
                                    card: {
                                        width: 140,
                                        height: 230,
                                        marginRight: '36px',
                                        marginBottom: '50px'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox text='현재 상영 중인 영화가 없습니다.' />
                }
            </Box>
        </Box>
    </Box>
};

export default Main;