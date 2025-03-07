import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import InputFormBox from '../../components/inputFormBox.js';
import { showToast } from '../../utils/toast.js';

const AuditoriumForm = ({setShowModal, data=null}) => {
    const { data: addAuditoriumRes, isLoading: isAddAuditoriumLoading, error: addAuditoriumError, doRequest: doAddAuditoriumRequest } = useReq(null, null);
    const { data: updateAuditoriumRes, isLoading: isUpdateAuditoriumLoading, error: updateAuditoriumError, doRequest: doUpdateAuditoriumRequest } = useReq(null, null);
    
    const inputs = [{
        id: 'auditoriumName',
        label : '상영관',
        value : data && data.auditoriumName,
    },{
        id: 'capacity',
        label : '좌석수',
        value : data && data.capacity,
        disabled: true
    }];

    const add = useCallback(()=>{
        const auditoriumName = document.querySelector('#auditoriumName').value;
        const capacity = document.querySelector('#capacity').value;

        doAddAuditoriumRequest(process.env.REACT_APP_SIGNUP_API, {
            method: 'POST',
            data: {
                auditoriumName: auditoriumName,
                capacity: capacity,
            }
        });
    },[])
    const update = useCallback(()=>{
        const auditoriumName = document.querySelector('#auditoriumName').value;
        const capacity = document.querySelector('#capacity').value;

        doUpdateAuditoriumRequest(process.env.REACT_APP_USER_API + `/${data.userId}`, {
            method: 'PUT',
            data: {
                auditoriumName: auditoriumName,
                capacity: capacity,
            }
        });
    },[data])

    useEffect(()=>{
        if(addAuditoriumRes != null){
            document.querySelector('#identifier').value = '';
            document.querySelector('#capacity').value = '';

            showToast('성공적으로 상영관이 추가되었습니다.', 'success');
        }
    },[addAuditoriumRes])
    useEffect(()=>{
        if(updateAuditoriumRes != null){
            showToast('성공적으로 정보가 변경되었습니다.', 'success');
            window.location.reload ()
        }
    },[updateAuditoriumRes])
    useEffect(() => {
        if (addAuditoriumError || updateAuditoriumError) {
            showToast('입력 값을 다시 확인해 주세요.', 'warn');
        }
    }, [addAuditoriumError, updateAuditoriumError])

    return <>
        <h2 className='mb-14'>{data ? '상영관 수정' : '상영관 등록'}</h2>
        <Box className='form mb-44'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" className="button-sm mr-6" onClick={data != null ? update : add}>저장</button>
            <button id="back" type="button" className="button-sm" onClick={() => setShowModal(false)}>뒤로</button>
        </Box>
    </>;
};

export default AuditoriumForm;