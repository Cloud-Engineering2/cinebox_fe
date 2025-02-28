import React, { useState, useEffect, useContext } from 'react';
import useReq from '../hooks/useReq.js';
import MainStyle from '../styles/pages/main.css';
import MovieCard from '../components/movieCard.js';
import EmptyBox from '../components/emptyBox.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { AppContext } from "../App.js";
import { Box } from '@mui/material';

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
        setMovies(data);
    },[data]);

    return <>
        <UnderBarTitle title={'박스오피스'}/>
        <Box className='movieListWraper'>
            <Box className='movieList'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                imgUrl='/assets/movie1.jpg'
                                styles={{
                                    card : {
                                        width : 167,
                                        height: 240,
                                        marginRight:'36px',
                                        marginBottom: '36px'
                                    },
                                    img : {
                                        width: '100%'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox/>
                }
            </Box>
        </Box>
    </>
};

export default Main;