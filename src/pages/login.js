import React, { useCallback, useEffect } from 'react';
import styles from '../styles/pages/login.module.css'
import useReq from '../hooks/useReq.js';
import { Box, Button, TextField } from '@mui/material';
import UnderBarTitle from '../components/underBarTitle.js';
import { showToast } from '../utils/toast.js';

const Login = () => {
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_LOGIN_URL, null);

    useEffect(() => {
        if (data != null) {
            localStorage.setItem('identifier', data.identifier);
            localStorage.setItem('role', data.role);
            localStorage.setItem("userId", data.userId);
            
            window.location.href = '/main';
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            showToast('아이디 혹은 비밀번호가 맞지 않습니다.', 'error');
        }
    }, [error]);

    const Login = useCallback(() => {
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;

        if(!identifier || !password){
            showToast('빈 칸을 입력해주세요.', 'warn');
            return;
        }

        doRequest(process.env.REACT_APP_LOGIN_URL, {
            method: "POST",
            data: {
                'identifier': identifier,
                'password': password,
            }
        });
    },[]);

    return <>
        <UnderBarTitle title={'로그인'} />
        <Box className={styles.login}>
            <Box className={styles.formBox}>
                <TextField id="identifier" placeholder="아이디" variant="standard" />
            </Box>
            <Box className={styles.formBox}>
                <TextField type='password' id="password" placeholder="비밀번호" variant="standard" />
            </Box>
            <Box id={styles.warning} className="mb_8 disabled">아이디 혹은 비밀번호를 입력해 주세요.</Box>
            <Button id="signupKakao" type="button" className="kakaoButton mb-10 bg-yellow opacity-07" disabled >
                <img className="kakaoIcon" src='/assets/kakaoIcon.png' />
                카카오로 로그인
            </Button>
            <button id="login" type="button" className="button mb-6" onClick={Login}>로그인</button>
        </Box>
    </>;
};

export default Login;