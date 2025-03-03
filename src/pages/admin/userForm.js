import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import InputFormBox from '../../components/inputFormBox.js';
import { AppContext } from "../../App.js";

const UserForm = ({setShowModal, data=null}) => {
    const {context, setContext} = useContext(AppContext);
    const { data: addUserRes, isLoading: isAddUserLoading, error: addUserError, doRequest: doAddUserRequest } = useReq(null, null);
    const { data: updateUserRes, isLoading: isUpdateUserLoading, error: updateUserError, doRequest: doUpdateUserRequest } = useReq(null, null);
    
    const inputs = [{
        id: 'identifier',
        label : '아이디',
        value : data && data.identifier
    },{
        id: 'password',
        label : '비밀번호',
        value : data && data.password
    },{
        id: 'email',
        label : '이메일',
        value : data && data.email
    },{
        id: 'name',
        label : '이름',
        value : data && data.name
    },{
        id: 'age',
        label : '나이',
        value : data && data.age
    },{
        id: 'gender',
        label : '성별',
        value : data && data.gender
    },{
        id: 'phone',
        label : '전화번호',
        value : data && data.phone
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
            headers: {
                    'Authorization': `Bearer ${context.token}`
            },
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
    },[context.token])
    const update = useCallback(()=>{
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;
        const email = document.querySelector('#email').value;
        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const gender = document.querySelector('#gender').value;
        const phone = document.querySelector('#phone').value;
        const role = document.querySelector('#role').value;

        doUpdateUserRequest(process.env.REACT_APP_USER_API + `/${data.userId}`, {
            method: 'PUT',
            headers: {
                    'Authorization': `Bearer ${context.token}`
            },
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
    },[context, data])

    useEffect(()=>{
        if(addUserRes != null){
            document.querySelector('#identifier').value = '';
            document.querySelector('#password').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#name').value = '';
            document.querySelector('#age').value = '';
            document.querySelector('#gender').value = '';
            document.querySelector('#phone').value = '';
            document.querySelector('#role').value = '';

            alert('success addUser');
        }
    },[addUserRes])
    useEffect(()=>{
        if(updateUserRes != null){
            alert('success updateUser');
            window.location.reload ()
        }
    },[updateUserRes])

    return <>
        <h2 className='mb-14'>유저 등록</h2>
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