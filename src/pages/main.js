import React, { useState, useEffect } from 'react';
import useReq from '../hooks/useReq.js';
import MainStyle from '../styles/pages/main.css';
import MovieCard from '../components/movieCard.js';
import EmptyBox from '../components/emptyBox.js';
import UnderBarTitle from '../components/underBarTitle.js';

const Main = () => {
    const token = localStorage.getItem('token');
    const identifier = localStorage.getItem('identifier');
    const role = localStorage.getItem('role');

    const [movies, setMovies] = useState([]);
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    useEffect(()=>{
        setMovies(data);
    },[data]);

    return <>
        <UnderBarTitle title={'박스오피스'}/>
        <div className='movieListWraper'>
            <div className='movieList'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <MovieCard
                                id={movie.movieId}
                                text={movie.title}
                                imgUrl='/assets/movie1.jpg'
                                styles={{
                                    card : {
                                        width : 140,
                                        height: 'fit-content',
                                        marginRight: 3,
                                        marginBottom: 3
                                    },
                                    img : {
                                        width: '100%'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox/>
                }
            </div>
        </div>
    </>
};

export default Main;