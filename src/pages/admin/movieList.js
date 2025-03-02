import React, { useState, useEffect, useContext } from 'react';
import useReq from '../../hooks/useReq.js';
import { AppContext } from "../../App.js";
import MovieDetail from '../../components/movieDetail.js';
import EmptyBox from '../../components/emptyBox.js';
import { Box } from '@mui/material';
import Modal from '../../components/modal.js';
import MovieForm from './movieForm.js';

const MovieList = () => {
    const {context, setContext} = useContext(AppContext);
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [showEditMovie, setShowEditMovie] = useState({movieId: null, state: false});

    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${context.token}`
        }
    });
    const { data: deleteMovieRes, isLoading: isDeleteMovieLoading, error: deleteMovieError, doRequest: doDeleteMovieRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);

    const deleteMovie = (movieId)=>{
        doDeleteMovieRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })
        document.querySelector(`.movie_${movieId}`).remove();
    }

    return <>
        {showAddMovie && <Modal className='flex jsfy-cnt-rght mb-10' content={<MovieForm setShowModal={setShowAddMovie} />}/>}
        <Box className='flex jsfy-cnt-rght mb-10'>
            <button id="addMovie" type="button" class="button-sm fs-23" onClick={()=>setShowAddMovie(true)}>+</button>
        </Box>
        {
            data ? data.map(movie =>{
                return <Box 
                key={`movie_${movie.movieId}`}
                style={{
                    marginBottom: 30,
                    border: '2px solid #004D09',
                    padding: 21,
                    borderRadius: 6
                }}>
                    <MovieDetail 
                    movie={movie} 
                    noBookingButton={true}/>
                    <Box className='controlBox'>
                        <button id="edit" type="button" class="button-sm mr-6" onClick={()=>setShowEditMovie({movieId: movie.movieId, state: true})}>수정</button>
                        <button id="delete" type="button" class="button-sm" onClick={()=>deleteMovie(movie.movieId)}>삭제</button>
                    </Box>
                </Box>
            }) : <EmptyBox text="영화를 추가하세요."/>
        }
        {showEditMovie.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<MovieForm setShowModal={setShowEditMovie} data={data.filter(dt => dt.movieId == showEditMovie.movieId)[0]}/>}/>}
    </>;
};

export default MovieList;