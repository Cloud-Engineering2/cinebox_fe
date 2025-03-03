import React, { useCallback, useEffect } from 'react';
import signup from '../styles/pages/signup.css'
import useReq from '../hooks/useReq.js';
import { Box, Button, TextField } from '@mui/material';
import UnderBarTitle from '../components/underBarTitle.js';
import ToggleButton from '../components/toggleButton.js';

const Signup = () => {
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_SIGN_UP_URL, null);

    useEffect(() => {
        if (data != null) {
            window.location.href = '/';
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            alert(error.response.data.message);
        }
    }, [error]);

    const SignUpReq = useCallback(() => {
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;
        const passwordCheck = document.querySelector('#passwordCheck').value;
        const email = document.querySelector('#email').value;
        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const gender = document.querySelector('.gender').value;
        const phone = document.querySelector('#phone').value;
        const role = document.querySelector('#role').value;

        if(!identifier || !password || !passwordCheck || !email || !name || !age || !gender || !phone || !role){
            alert('빈 칸을 입력해주세요.');
            return;
        }
        if(passwordCheck != password){
            alert('패스워드를 다시 확인해주세요.');
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
                'age': age,
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
                <TextField id="age" placeholder="나이" variant="standard" />
            </Box>
            <Box className="age-form-box">
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
                <TextField id="password" placeholder="비밀번호" variant="standard" />
            </Box>
            <Box className="form-box">
                <TextField id="passwordCheck" placeholder="비밀번호 확인" variant="standard" />
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