import React, { useState, useEffect, useContext } from 'react';
import useReq from '../hooks/useReq.js';
import MainStyle from '../styles/pages/main.css';
import MovieCard from '../components/movieCard.js';
import EmptyBox from '../components/emptyBox.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { AppContext } from "../App.js";
import { Box, TextField } from '@mui/material';

const Main = () => {
    const {context, setContext} = useContext(AppContext);
    const [movies, setMovies] = useState([]);
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${context.token}`
        }
    });

    useEffect(()=>{
        if(data != null) setMovies(data);
    },[data])

    return <>
        <UnderBarTitle title={'박스오피스'}/>
        <Box className='movieListWraper'>
            <Box className='movieList'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                imgUrl={movie.posterImageUrl ? movie.posterImageUrl : '/assets/noImage.png'}
                                styles={{
                                    card : {
                                        width : 140,
                                        height: 230,
                                        marginRight:'36px',
                                        marginBottom: '50px'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox text='현재 상영 중인 영화가 없습니다.'/>
                }
            </Box>
        </Box>
    </>
};

export default Main;