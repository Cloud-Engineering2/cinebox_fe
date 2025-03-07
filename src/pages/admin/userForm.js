import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import InputFormBox from '../../components/inputFormBox.js';
import { convertDateFormatter } from '../../utils/index.js';
import { showToast } from '../../utils/toast.js';
import { checkEmailRegExp, checkPhoneRegExp } from '../../utils/regExp.js';

const UserForm = ({setShowModal, data=null}) => {
    const { data: addUserRes, isLoading: isAddUserLoading, error: addUserError, doRequest: doAddUserRequest } = useReq(null, null);
    const { data: updateUserRes, isLoading: isUpdateUserLoading, error: updateUserError, doRequest: doUpdateUserRequest } = useReq(null, null);
    
    const inputs = [{
        id: 'identifier',
        label : '아이디',
        value : data && data.identifier,
        disabled: true
    },{
        id: 'password',
        label : '비밀번호',
        value : data && data.password
    },{
        id: 'email',
        label : '이메일',
        value : data && data.email,
        placeholder: 'ex> example@example.com'
    },{
        id: 'name',
        label : '이름',
        value : data && data.name
    },{
        id: 'birthDate',
        label : '생년월일',
        type: 'datepicker',
        value : data && data.birthDate
    },{
        id: 'gender',
        label : '성별',
        defaultValue: data && data.gender,
        type: 'select',
        items: [{
            label: 'MALE', 
            value: 'MALE'
        },{
            label: 'FEMALE', 
            value: 'FEMALE'
        }]
    },{
        id: 'phone',
        label : '전화번호',
        value : data && data.phone,
        placeholder: 'ex> 010-1234-5678'
    },{
        id: 'role',
        label : '역할',
        value : data && data.role,
        disabled: data && (data.role != 'ADMIN')
    }];

    const add = useCallback(()=>{
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;
        const email = document.querySelector('#email').value;
        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const gender = document.querySelector('#gender').value;
        const phone = document.querySelector('#phone').value;
        const role = document.querySelector('#role').value;

        doAddUserRequest(process.env.REACT_APP_SIGNUP_API, {
            method: 'POST',
            data: {
                identifier: identifier,
                password: password,
                email: email,
                name: name,
                age: age,
                gender: gender,
                phone: phone,
                role: role
            }
        });
    },[])
    const update = useCallback(()=>{
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;
        const email = checkEmailRegExp(document.querySelector('#email').value);
        const name = document.querySelector('#name').value;
        const birthDate = convertDateFormatter(document.querySelector('.birthDate input').value);
        const gender = document.querySelector('#gender').value;
        const phone = checkPhoneRegExp(document.querySelector('#phone').value);
        const role = document.querySelector('#role').value;

        doUpdateUserRequest(process.env.REACT_APP_USER_API + `/${data.userId}`, {
            method: 'PUT',
            data: {
                identifier: identifier,
                password: password,
                email: email,
                name: name,
                birthDate: birthDate,
                gender: gender,
                phone: phone,
                role: role
            }
        });
    },[data])

    useEffect(()=>{
        if(addUserRes != null){
            document.querySelector('#identifier').value = '';
            document.querySelector('#password').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#name').value = '';
            document.querySelector('.birthDate input').value = '';
            document.querySelector('#gender').value = '';
            document.querySelector('#phone').value = '';
            document.querySelector('#role').value = '';

            showToast('성공적으로 유저가 추가되었습니다.', 'success');
        }
    },[addUserRes])
    useEffect(()=>{
        if(updateUserRes != null){
            showToast('성공적으로 정보가 변경되었습니다.', 'success');
            window.location.reload ()
        }
    },[updateUserRes])
    useEffect(() => {
        if (addUserError || updateUserError) {
            showToast('입력 값을 다시 확인해 주세요.', 'warn');
        }
    }, [addUserError, updateUserError])

    return <>
        <h2 className='mb-14'>{data ? '유저 수정' : '유저 등록'}</h2>
        <Box className='form mb-44'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" className="button-sm mr-6" onClick={data != null ? update : add}>저장</button>
            <button id="back" type="button" className="button-sm" onClick={() => setShowModal(false)}>뒤로</button>
        </Box>
    </>;
};

export default UserForm;