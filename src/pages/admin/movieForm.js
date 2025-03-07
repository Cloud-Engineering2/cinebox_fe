import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import InputFormBox from '../../components/inputFormBox.js';
import { AppContext } from "../../App.js";

const MovieForm = ({setShowModal, data=null}) => {
    const {context, setContext} = useContext(AppContext);
    const { data: addMovieRes, isLoading: isAddMovieLoading, error: addMovieError, doRequest: doAddMovieRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);
    const { data: updateMovieRes, isLoading: isUpdateMovieLoading, error: updateMovieError, doRequest: doUpdateMovieRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);

    const inputs = useMemo(() => [
        {
            id: 'title',
            label: '영화제목',
            value: data && data.title
        },
        {
            id: 'releaseDate',
            label: '개봉일',
            value: data && data.releaseDate,
            placeholder: 'YYYY-MM-DD'
        },
        {
            id: 'runtime',
            label: '러닝타임',
            value: data && data.runtime
        },
        {
            id: 'ratingGrade',
            label: '관람등급',
            defaultValue: data && data.ratingGrade,
            type: 'select',
            items: [{
                label: '전체관람가', 
                value: '전체관람가'
            },{
                label: '15세이상관람가', 
                value: '15세이상관람가'
            },{
                label: '12세이상관람가', 
                value: '12세이상관람가'
            },{
                label: '청소년관람불가', 
                value: '청소년관람불가'
            }]
        },
        {
            id: 'genre',
            label: '장르',
            value: data && data.genre
        },
        {
            id: 'director',
            label: '감독',
            value: data && data.director
        },
        {
            id: 'actors',
            label: '출연진',
            value: data && data.actors
        },
        {
            id: 'status',
            label: '상영여부',
            type: 'select',
            items: [{
                label: 'SHOWING', 
                value: 'SHOWING'
            },{
                label: 'UPCOMMING', 
                value: 'UPCOMMING'
            },{
                label: 'ENDED', 
                value: 'ENDED'
            }]
        },
        {
            id: 'posterImageUrl',
            label: '포스터',
            value: data && data.posterImageUrl
        },
        {
            id: 'plot',
            label: '영화 설명',
            value: data && data.plot
        }
    ], [data]);

    const remove = useCallback(()=>{
        const uploadFile = document.querySelector('#uploadFile');
        uploadFile.value = null;
    },[])
    const add = useCallback(()=>{
        const title = document.querySelector('#title').value;
        const releaseDate = document.querySelector('#releaseDate').value;
        const runtime = document.querySelector('#runtime').value;
        const ratingGrade = document.querySelector('#ratingGrade').value;
        const genre = document.querySelector('#genre').value;
        const director = document.querySelector('#director').value;
        const actors = document.querySelector('#actors').value;
        const status = document.querySelector('#status').value;
        const posterImageUrl = document.querySelector('#posterImageUrl').value;
        const uploadFile = document.querySelector('#uploadFile').value;
        const plot = document.querySelector('#plot').value;
        
        doAddMovieRequest(process.env.REACT_APP_MOVIE_API, {
            method: 'POST',
            data: {
                title: title,
                releaseDate: releaseDate,
                runtime: runtime,
                ratingGrade: ratingGrade,
                genre: genre,
                director: director,
                actors: actors,
                status: status,
                posterImageUrl: posterImageUrl,
                uploadFile: uploadFile,
                plot: plot,
                likeCount: 0
            }
        });
    },[])
    const update = useCallback(()=>{
        const title = document.querySelector('#title').value;
        const releaseDate = document.querySelector('#releaseDate').value;
        const runtime = document.querySelector('#runtime').value;
        const ratingGrade = document.querySelector('#ratingGrade').value;
        const genre = document.querySelector('#genre').value;
        const director = document.querySelector('#director').value;
        const actors = document.querySelector('#actors').value;
        const status = document.querySelector('#status').value;
        const posterImageUrl = document.querySelector('#posterImageUrl').value;
        const uploadFile = document.querySelector('#uploadFile').value;
        const plot = document.querySelector('#plot').value;
        
        doUpdateMovieRequest(process.env.REACT_APP_MOVIE_API + `/${data.movieId}`, {
            method: 'PUT',
            data: {
                movieId: data.movieId,
                title: title,
                releaseDate: releaseDate,
                runtime: runtime,
                ratingGrade: ratingGrade,
                genre: genre,
                director: director,
                actors: actors,
                status: status,
                posterImageUrl: posterImageUrl,
                uploadFile: uploadFile,
                plot: plot
            }
        });
    },[])

    useEffect(()=>{
        if(addMovieRes != null){
            document.querySelector('#title').value = '';
            document.querySelector('#releaseDate').value = '';
            document.querySelector('#runTime').value = '';
            document.querySelector('#ratingGrade').value = '';
            document.querySelector('#genre').value = '';
            document.querySelector('#director').value = '';
            document.querySelector('#actor').value = '';
            document.querySelector('#status').value = '';
            document.querySelector('#posterImageUrl').value = '';
            document.querySelector('#uploadFile').value = '';
            document.querySelector('#plot').value = '';

            alert('success addMOvie');
        }
    },[addMovieRes])
    useEffect(()=>{
        if(updateMovieRes != null){
            alert('success updateMovie');
            window.location.reload ()
        }
    },[updateMovieRes])
    useEffect(() => {
        if (addMovieError || updateMovieError) {
            alert('입력 값을 다시 확인해 주세요.');
        }
    }, [addMovieError, updateMovieError])

    
    return <>
        <h2 className='mb-14'>{data ? '영화 수정' : '영화 등록'}</h2>
        <Box className='form mb-44'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <h2 className='mb-14'>대표 이미지</h2>
        <Box className='uploadForm'>
            <Box>
                <input id='uploadFile' type="file"/>
            </Box>
            <button id="remove" type="button" className="button-sm mr-6" onClick={remove}>삭제</button>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" className="button-sm mr-6" onClick={data != null ? update : add}>저장</button>
            <button id="back" type="button" className="button-sm" onClick={() => setShowModal(false)}>뒤로</button>
        </Box>
    </>;
};

export default MovieForm;