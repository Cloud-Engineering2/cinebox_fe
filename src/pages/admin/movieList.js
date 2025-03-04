import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import { AppContext } from "../../App.js";
import MovieDetail from '../../components/movieDetail.js';
import EmptyBox from '../../components/emptyBox.js';
import { Box } from '@mui/material';
import Modal from '../../components/modal.js';
import MovieForm from './movieForm.js';
import admin from '../../styles/pages/admin.css';

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

    const deleteMovie = useCallback((movieId) => {
        doDeleteMovieRequest(
            process.env.REACT_APP_MOVIE_API + `/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })
        document.querySelector(`#movie_${movieId}`).remove();
    }, [context.token]);
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
    }, [context.token]); 

    return <>
        {showAddMovie && <Modal className='flex jsfy-cnt-rght mb-10' content={<MovieForm setShowModal={setShowAddMovie} />}/>}
        <Box className='flex jsfy-cnt-rght mb-10'>
            <select id="sortingSelectBox" className="mr-7" onChange={searchMoviesList}>
                <option value="" selected>정렬</option>
                <option value="title">제목</option>
                <option value="" disabled>예매율</option>
            </select>
            <input id="searchBox" className='mr-7' placeholder="텍스트를 입력하세요" onChange={searchMoviesList}/>
            <button id="addMovie" type="button" className="button-sm fs-23" onClick={()=>setShowAddMovie(true)}>+</button>
        </Box>
        {
            data ? data.map(movie =>{
                return <Box 
                key={`movie_${movie.movieId}`}
                id={`movie_${movie.movieId}`}
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
                        <button id="edit" type="button" className="button-sm mr-6" onClick={()=>window.location.href=`/screen/${movie.movieId}`}>상영정보 조회</button>
                        <button id="edit" type="button" className="button-sm mr-6" onClick={()=>setShowEditMovie({movieId: movie.movieId, state: true})}>수정</button>
                        <button id="delete" type="button" className="button-sm" onClick={()=>deleteMovie(movie.movieId)}>삭제</button>
                    </Box>
                </Box>
            }) : <EmptyBox text="영화를 추가하세요."/>
        }
        {showEditMovie.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<MovieForm setShowModal={setShowEditMovie} data={data.filter(dt => dt.movieId == showEditMovie.movieId)[0]}/>}/>}
    </>;
};

export default MovieList;