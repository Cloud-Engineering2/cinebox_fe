import React, { useState, useEffect } from 'react';
import useReq from '../hooks/useReq.js';
import signup from '../styles/pages/signup.css'
import { TextField } from '@mui/material';
import UnderBarTitle from '../components/underBarTitle.js';
import ToggleButton from '../components/toggleButton.js';

const Signup = () => {
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_SIGN_UP_URL, null);

    useEffect(()=>{
        if(data != null){
            window.location.href='/';
        }
    },[data]);

    const SignUpReq = ()=>{
        const identifier = document.querySelector('#identifier').value;
        const password = document.querySelector('#password').value;
        const email = document.querySelector('#email').value;
        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const gender = document.querySelector('.gender').value;
        const phone = document.querySelector('#phone').value;
        const role = document.querySelector('#role').value;


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
    }

    return <>
        <UnderBarTitle title={'회원가입'}/>
        <div className="signup">
            <div class="form-box">
                <TextField id="name" placeholder="이름" variant="standard" />
            </div>
            <div class="form-box">
                <TextField id="age" placeholder="나이" variant="standard" />
            </div>
            <div class="age-form-box">
                <label>성별</label>
                <div>
                    <ToggleButton
                    className='gender'
                    buttons={[{
                        value:'MALE',
                        label:'MALE'
                    },{
                        value:'FEMALE',
                        label:'FEMALE'
                    }]}/>
                </div>
            </div>
            <div class="form-box">
                <TextField id="email" placeholder="이메일" variant="standard" />
            </div>
            <div class="form-box">
                <TextField id="identifier" placeholder="아이디" variant="standard" />
            </div>
            <div class="form-box">
                <TextField id="password" placeholder="비밀번호" variant="standard" />
            </div>
            {/* <div class="form-box">
                <TextField id="password" placeholder="비밀번호 확인" variant="standard" />
            </div> */}
            <div class="form-box">
                <TextField id="phone" placeholder="전화번호" variant="standard" />
            </div>
            <div class="form-box mb-18">
                <select id="role" class="form-select">
                    <option value="USER" selected>USER</option>
                </select>
            </div>
            <div id="warning" class="disabled">빈칸을 입력해 주세요.</div>
            <button id="signupKakao" type="button" class="kakaoButton mb-10 bg-yellow opacity-07" disabled >
                <img className="kakaoIcon" src='/assets/kakaoIcon.png'/>
                5초 만에 카카오로 시작하기
            </button>
            <button id="signup" type="button" class="button" onClick={SignUpReq}>회원가입</button>
        </div>
    </>;
};

export default Signup;