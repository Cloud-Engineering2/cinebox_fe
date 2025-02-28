import React, { useState, useEffect, useContext } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import { AppContext } from "../../App.js";
import InputFormBox from '../../components/inputFormBox.js';

const MovieForm = () => {
    const {context, setContext} = useContext(AppContext);

    const inputs = [{
        id: 'title',
        label : '영화제목',
    },{
        id: 'releaseDate',
        label : '개봉일',
    },{
        id: 'runTime',
        label : '러닝타임',
    },{
        id: 'ratingGrade',
        label : '관람등급',
    },{
        id: 'genre',
        label : '카테고리',
    },{
        id: 'director',
        label : '감독',
    },{
        id: 'actor',
        label : '출연진',
    },{
        id: 'status',
        label : '상영여부',
    },{
        id: 'posterImageUrl',
        label : '포스터',
    }];

    const remove = ()=>{
        const uploadFile = document.querySelector('#uploadFile');
        uploadFile.value = null;
    }
    const save = ()=>{
        const title = document.querySelector('#title');
        const releaseDate = document.querySelector('#releaseDate');
        const runTime = document.querySelector('#runTime');
        const ratingGrade = document.querySelector('#ratingGrade');
        const genre = document.querySelector('#genre');
        const director = document.querySelector('#director');
        const actor = document.querySelector('#actor');
        const status = document.querySelector('#status');
        const posterImageUrl = document.querySelector('#posterImageUrl');
        const uploadFile = document.querySelector('#uploadFile');
        
        debugger;
    }
    const upload = ()=>{
        debugger;
    }

    return <>
        <h2 className='mb-14'>영화 등록</h2>
        <Box className='form mb-44'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <h2 className='mb-14'>대표 이미지</h2>
        <Box className='uploadForm'>
            <Box>
                <input id='uploadFile' type="file"/>
            </Box>
            <button id="remove" type="button" class="button-sm mr-6" onClick={remove}>삭제</button>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" class="button-sm mr-6" onClick={save}>저장</button>
            <button id="back" type="button" class="button-sm" onClick={upload}>뒤로</button>
        </Box>
    </>;
};

export default MovieForm;