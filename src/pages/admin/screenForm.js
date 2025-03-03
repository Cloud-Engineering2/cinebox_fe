import React, { useState, useEffect, useContext } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import InputFormBox from '../../components/inputFormBox.js';
import { AppContext } from "../../App.js";

const ScreenForm = ({setShowModal, data=null}) => {
    const {context, setContext} = useContext(AppContext);
    const { data: addScreenRes, isLoading: isAddScreenLoading, error: addScreenError, doRequest: doAddScreenRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);
    const { data: updateScreenRes, isLoading: isUpdateScreenLoading, error: updateScreenError, doRequest: doUpdateScreenRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);

    const inputs = [{
        id: 'price',
        label : '금액',
        value : data && data.price
    },{
        id: 'movieId',
        label : '영화',
        value : data && data.movieId
    },{
        id: 'auditoriumId',
        label : '상영관',
        value : data && data.auditoriumId
    },{
        id: 'startTime',
        label : '시작시간',
        value : data && data.startTime
    },{
        id: 'endTime',
        label : '종료시간',
        value : data && data.endTime
    }];

    const add = ()=>{
        const price = document.querySelector('#price').value;
        const movieId = document.querySelector('#movieId').value;
        const auditoriumId = document.querySelector('#auditoriumId').value;
        const startTime = document.querySelector('#startTime').value;
        const endTime = document.querySelector('#endTime').value;

        doAddScreenRequest(process.env.REACT_APP_MOVIE_API, {
            method: 'POST',
            headers: {
                    'Authorization': `Bearer ${context.token}`
            },
            data: {
                price: price,
                movieId: movieId,
                auditoriumId: auditoriumId,
                startTime: startTime,
                endTime: endTime,
            }
        });
    }
    const update = ()=>{
        const price = document.querySelector('#price').value;
        const movieId = document.querySelector('#movieId').value;
        const auditoriumId = document.querySelector('#auditoriumId').value;
        const startTime = document.querySelector('#startTime').value;
        const endTime = document.querySelector('#endTime').value;
        
        doUpdateScreenRequest(process.env.REACT_APP_MOVIE_API + `/${data.movieId}`, {
            method: 'PUT',
            headers: {
                    'Authorization': `Bearer ${context.token}`
            },
            data: {
                price: price,
                movieId: movieId,
                auditoriumId: auditoriumId,
                startTime: startTime,
                endTime: endTime,
            }
        });
    }

    useEffect(()=>{
        if(addScreenRes != null){
            document.querySelector('#price').value = '';
            document.querySelector('#movieId').value = '';
            document.querySelector('#auditoriumId').value = '';
            document.querySelector('#startTime').value = '';
            document.querySelector('#endTime').value = '';

            alert('success addScreen');
        }
    },[addScreenRes])

    
    return <>
        <h2 className='mb-14'>상영정보 등록</h2>
        <Box className='form mb-44'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" className="button-sm mr-6" onClick={data != null ? update : add}>저장</button>
            <button id="back" type="button" className="button-sm" onClick={() => setShowModal(false)}>뒤로</button>
        </Box>
    </>;
};

export default ScreenForm;