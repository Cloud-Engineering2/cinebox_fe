import { Box, Button, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BasicDatePicker from '../components/datePicker.js';
import ToggleButton from '../components/toggleButton.js';
import UnderBarTitle from '../components/underBarTitle.js';
import useReq from '../hooks/useReq.js';
import '../styles/pages/signup.css';
import { convertDateFormatter } from '../utils/datetime.js';
import { checkEmailRegExp } from '../utils/regExp.js';
import { showToast } from '../utils/toast.js';

const KakaoSignup = () => {
    const location = useLocation();
    const userData = location.state;
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_SIGN_UP_URL, null);

    useEffect(() => {
        if (userData) {
            document.querySelector('#identifier').value = userData.id;
            document.querySelector('#email').value = userData.kakao_account.email;
            document.querySelector('#name').value = userData.properties.nickname;
        }
    }, []);
    useEffect(() => {
        if (data) {
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
        const email = checkEmailRegExp(document.querySelector('#email').value);
        const name = document.querySelector('#name').value;
        const birthDate = document.querySelector('.birthDate input').value;
        const phone = document.querySelector('#phone').value;
        var gender = null;

        if (!identifier || !email || !name || !birthDate || !phone) {
            showToast('빈 칸을 입력해주세요.', 'warn');
            return;
        }
        if (document.querySelector('.gender button[aria-pressed=true]')) {
            gender = document.querySelector('.gender button[aria-pressed=true]').value;
        } else {
            showToast('성별을 선택해주세요.', 'warn');
            return;
        }

        doRequest(process.env.REACT_APP_SIGN_UP_KAKAO_URL, {
            method: "POST",
            data: {
                'identifier': identifier,
                'email': email,
                'name': name,
                'birthDate': convertDateFormatter(birthDate),
                'gender': gender,
                'phone': phone,
                'role': 'USER',
                'platformType': 'KAKAO'
            }
        });
        console.log('SignUp URL:', process.env.REACT_APP_SIGN_UP_KAKAO_URL);  // 확인용 로그
    }, [])

    return <>
        <UnderBarTitle title={'카카오 회원가입'} />
        <Box className="signup">
            <Box className="form-box">
                <TextField id="name" placeholder="이름" variant="standard" disabled />
            </Box>
            <Box className="form-box">
                <BasicDatePicker label='생년월일' className='birthDate' />
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
                <TextField id="email" placeholder="이메일" variant="standard" disabled />
            </Box>
            <Box className="form-box">
                <TextField id="identifier" placeholder="아이디" variant="standard" disabled />
            </Box>
            <Box className="form-box">
                <TextField id="phone" placeholder="전화번호" variant="standard" />
            </Box>
            <Box id="warning" className="disabled">빈칸을 입력해 주세요.</Box>
            <Button id="signup" type="button" className="kakaoButton mb-10 bg-yellow" onClick={SignUpReq}>
                <img className="kakaoIcon" src='/assets/kakaoIcon.png' />
                카카오 회원가입
            </Button>
        </Box>
    </>;
};

export default KakaoSignup;