import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import InputFormBox from '../../components/inputFormBox.js';
import { AppContext } from "../../App.js";
import { getFullDateTime } from '../../utils/datetime.js';
import { showToast } from '../../utils/toast.js';

const ScreenForm = ({setShowModal, data=null, type='add'}) => {
    const {context, setContext} = useContext(AppContext);
    const { data: addScreenRes, isLoading: isAddScreenLoading, error: addScreenError, doRequest: doAddScreenRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);
    const { data: updateScreenRes, isLoading: isUpdateScreenLoading, error: updateScreenError, doRequest: doUpdateScreenRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);
    const { data: getMovieRes, isLoading: isGetMovieLoading, error: getMovieError, doRequest: doGetMovieRequest } = useReq(process.env.REACT_APP_MOVIE_API, {
        method: 'GET'
    });
    const { data: getAuditoriumRes, isLoading: isGetAuditoriumLoading, error: getAuditoriumError, doRequest: doGetAuditoriumRequest } = useReq(process.env.REACT_APP_AUDITORIUM_API, {
        method: 'GET'
    });

    const inputs = [{
        id: 'movieId',
        label : '영화',
        type: 'select',
        defaultValue: data && data.movieId,
        items: getMovieRes && getMovieRes.map(dt => {return {label: dt.title, value: dt.movieId};}),
        disabled: true
    },{
        id: 'auditoriumId',
        label : '상영관',
        type: 'select',
        items : getAuditoriumRes && getAuditoriumRes.map(dt => {return {label: dt.auditoriumName, value: dt.auditoriumId};})
    },{
        id: 'startTime',
        label : '시작시간',
        type: 'datetimepicker',
        value : data && data.birthDate
    },{
        id: 'price',
        label : '금액',
        value : data && data.price
    }];

    useEffect(()=>{
        if(addScreenRes != null){
            document.querySelector('#price').value = '';
            document.querySelector('#movieId').value = '';
            document.querySelector('#auditoriumId').value = '';

            showToast('성공적으로 상영정보가 추가되었습니다.', 'success');
            window.location.reload ();
        }
    },[addScreenRes])
    useEffect(()=>{
        if(updateScreenRes){
            showToast('성공적으로 상영정보가 수정되었습니다.', 'success');
            window.location.reload ();
        }
    },[updateScreenRes])
    useEffect(() => {
        if (addScreenError || updateScreenError) {
            showToast('해당 상영관 및 시간에 상영할 수 없습니다.','error');
            document.querySelector('#startTime').value = '';
        }
    }, [addScreenError, updateScreenError])
    useEffect(() => {
        if (getAuditoriumError || getMovieError) {
            showToast('데이터를 획득하지 못하였습니다.', 'error');
        }
    }, [getAuditoriumError, getMovieError])

    const add = useCallback(()=>{
        const price = document.querySelector('#price').value;
        const movieId = document.querySelector('#movieId').value;
        const auditoriumId = document.querySelector('#auditoriumId').value;
        const startTime = getFullDateTime(document.querySelector('.startTime input').value);

        doAddScreenRequest(process.env.REACT_APP_SCREEN_API, {
            method: 'POST',
            data: {
                price: price,
                movieId: movieId,
                auditoriumId: auditoriumId,
                startTime: startTime
            }
        });
    },[])
    const update = useCallback(()=>{
        const price = document.querySelector('#price').value;
        const movieId = document.querySelector('#movieId').value;
        const auditoriumId = document.querySelector('#auditoriumId').value;
        const startTime = getFullDateTime(document.querySelector('.startTime input').value);

        doUpdateScreenRequest(process.env.REACT_APP_SCREEN_API + `/${data.screenId}`, {
            method: 'PUT',
            data: {
                price: price,
                movieId: movieId,
                auditoriumId: auditoriumId,
                startTime: startTime
            }
        });
    },[data])

    
    return <>
        <h2 className='mb-14'>{data ? '상영정보 수정' : '상영정보 등록'}</h2>
        <Box className='form mb-24'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" className="button-sm mr-6" onClick={(type == 'update') ? update : add}>저장</button>
            <button id="back" type="button" className="button-sm" onClick={() => setShowModal(false)}>뒤로</button>
        </Box>
    </>;
};

export default ScreenForm;