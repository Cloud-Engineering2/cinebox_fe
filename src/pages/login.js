import React, { useState, useEffect, useContext } from 'react';
import useReq from '../hooks/useReq.js';
import login from '../styles/pages/login.css'
import { TextField } from '@mui/material';
import UnderBarTitle from '../components/underBarTitle.js';
import { AppContext } from "../App.js";

const Login = () => {
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_LOGIN_URL, null);

    const LoginReq = ()=>{
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;

        doRequest(process.env.REACT_APP_LOGIN_URL, {
            method: "POST",
            data: {
                'identifier': identifier,
                'password': password,
            }
        });
    };

    useEffect(()=>{
        if(data != null){
            localStorage.setItem('token', data.token);
            localStorage.setItem('identifier', data.identifier);
            localStorage.setItem('role', data.role);
            localStorage.setItem("userId", data.userId);

            window.location.href='/main';
        }
    },[data]);

    return <>
        <UnderBarTitle title={'로그인'}/>
        <div class="login">
            <div class="form-box">
                <TextField id="identifier" placeholder="아이디" variant="standard" />
            </div>
            <div class="form-box">
                <TextField id="password" placeholder="비밀번호" variant="standard" />
            </div>
            <div id="warning" class="mb_8 disabled">아이디 혹은 비밀번호를 입력해 주세요.</div>
            <button id="login" type="button" class="button mb-6" onClick={LoginReq}>로그인</button>
        </div>
    </>;
};

export default Login;