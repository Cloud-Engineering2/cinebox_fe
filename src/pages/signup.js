import React, { useCallback, useEffect } from 'react';
import '../styles/pages/signup.css'
import useReq from '../hooks/useReq.js';
import { Box, Button, TextField } from '@mui/material';
import UnderBarTitle from '../components/underBarTitle.js';
import ToggleButton from '../components/toggleButton.js';
import BasicDatePicker from '../components/datePicker.js';
import { convertDateFormatter, convertISOString } from '../utils/index.js';
import { showToast } from '../utils/toast.js';
import { checkEmailRegExp, checkPhoneRegExp } from '../utils/regExp.js';

const Signup = () => {
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_SIGN_UP_URL, null);

    useEffect(() => {
        if (data != null) {
            window.location.href = '/';
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            showToast(error.response.data.message, 'error');
        }
    }, [error]);

    const SignUpReq = useCallback(() => {
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;
        const passwordCheck = document.querySelector('#passwordCheck').value;
        const email = checkEmailRegExp(document.querySelector('#email').value);
        const name = document.querySelector('#name').value;
        const birthDate = document.querySelector('.birthDate input').value;
        const phone = checkPhoneRegExp(document.querySelector('#phone').value);
        const role = document.querySelector('#role').value;
        const gender = null;

        if(!identifier || !password || !passwordCheck || !email || !name || !birthDate || !phone || !role){
            showToast('빈 칸을 입력해주세요.', 'warn');
            return;
        }
        if(document.querySelector('.gender button[aria-pressed=true]')){
            gender = document.querySelector('.gender button[aria-pressed=true]').value;
        }else {
            showToast('성별을 선택해주세요.', 'warn');
            return;
        }
        if(passwordCheck != password){
            showToast('패스워드를 다시 확인해주세요.', 'warn');
            document.querySelector('#passwordCheck').value = '';
            return;
        }

        doRequest(process.env.REACT_APP_SIGN_UP_URL, {
            method: "POST",
            data: {
                'identifier': identifier,
                'password': password,
                'email': email,
                'name': name,
                'birthDate': convertDateFormatter(birthDate),
                'gender': gender,
                'phone': phone,
                'role': role
            }
        });
    }, [])

    return <>
        <UnderBarTitle title={'회원가입'} />
        <Box className="signup">
            <Box className="form-box">
                <TextField id="name" placeholder="이름" variant="standard" />
            </Box>
            <Box className="form-box">
                <BasicDatePicker label='생년월일' className='birthDate'/>
            </Box>
            <Box className="gender-form-box">
                <label>성별</label>
                <Box>
                    <ToggleButton
                        className='gender'
                        buttons={[{
                            value: 'MALE',
                            label: 'MALE'
                        }, {
                            value: 'FEMALE',
                            label: 'FEMALE'
                        }]} />
                </Box>
            </Box>
            <Box className="form-box">
                <TextField id="email" placeholder="이메일" variant="standard" />
            </Box>
            <Box className="form-box">
                <TextField id="identifier" placeholder="아이디" variant="standard" />
            </Box>
            <Box className="form-box">
                <TextField type='password' id="password" placeholder="비밀번호" variant="standard" />
            </Box>
            <Box className="form-box">
                <TextField type='password' id="passwordCheck" placeholder="비밀번호 확인" variant="standard" />
            </Box>
            <Box className="form-box">
                <TextField id="phone" placeholder="전화번호" variant="standard" />
            </Box>
            <Box className="form-box mb-18">
                <select id="role" className="form-select">
                    <option value="USER" selected>USER</option>
                </select>
            </Box>
            <Box id="warning" className="disabled">빈칸을 입력해 주세요.</Box>
            <Button id="signupKakao" type="button" className="kakaoButton mb-10 bg-yellow opacity-07" disabled >
                <img className="kakaoIcon" src='/assets/kakaoIcon.png' />
                5초 만에 카카오로 시작하기
            </Button>
            <Button id="signup" type="button" className="button" onClick={SignUpReq}>회원가입</Button>
        </Box>
    </>;
};

export default Signup;