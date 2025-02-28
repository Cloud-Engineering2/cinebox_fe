import React, { useState, useEffect, useContext } from 'react';
import useReq from '../../hooks/useReq.js';
import { Box } from '@mui/material';
import { AppContext } from "../../App.js";
import InputFormBox from '../../components/inputFormBox.js';

const UserForm = () => {
    const {context, setContext} = useContext(AppContext);

    const inputs = [{
        id: 'id',
        label : '아이디',
    },{
        id: 'password',
        label : '비밀번호',
    },{
        id: 'email',
        label : '이메일',
    },{
        id: 'name',
        label : '이름',
    },{
        id: 'age',
        label : '나이',
    },{
        id: 'gender',
        label : '성별',
    },{
        id: 'phone',
        label : '전화번호',
    },{
        id: 'role',
        label : '역할',
    }];

    const save = ()=>{
        const id = document.querySelector('#id');
        const password = document.querySelector('#password');
        const email = document.querySelector('#email');
        const name = document.querySelector('#name');
        const age = document.querySelector('#age');
        const gender = document.querySelector('#gender');
        const phone = document.querySelector('#phone');
        const role = document.querySelector('#role');

        debugger;
    }
    const back = ()=>{
        debugger;
    }

    return <>
        <h2 className='mb-14'>유저 등록</h2>
        <Box className='form mb-44'>
            <InputFormBox inputs={inputs} style={{width: '75%'}}/>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" class="button-sm mr-6" onClick={save}>저장</button>
            <button id="back" type="button" class="button-sm" onClick={back}>뒤로</button>
        </Box>
    </>;
};

export default UserForm;