import React, { useState, useEffect } from 'react';
import useReq from '../hooks/useReq.js';
import signup from '../styles/pages/signup.css'
import { TextField } from '@mui/material';
import Layout from '../templates/Layout.js';
import UnderBarTitle from '../components/underBarTitle.js';

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
        const gender = document.querySelector('#gender').value;
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

    return <Layout>
        <UnderBarTitle title={'회원가입'}/>
        <div className="signup">
            <div className='signupForms'>
                <div className='wd-50p mr-20'>
                    <div class="form-box">
                        <TextField id="identifier" placeholder="아이디" variant="standard" />
                    </div>
                    <div class="form-box">
                        <TextField id="password" placeholder="비밀번호" variant="standard" />
                    </div>
                    <div class="form-box">
                        <TextField id="email" placeholder="이메일" variant="standard" />
                    </div>
                    <div class="form-box">
                        <TextField id="name" placeholder="이름" variant="standard" />
                    </div>
                </div>
                <div className='wd-50p'>
                    <div class="form-box">
                        <TextField id="age" placeholder="나이" variant="standard" />
                    </div>
                    <div class="form-box">
                        <select id="gender" class="form-select">
                            <option value="" selected>성별</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div class="form-box">
                        <TextField id="phone" placeholder="전화번호" variant="standard" />
                    </div>
                    <div class="form-box mb-18">
                        <select id="role" class="form-select">
                            <option value="" selected>권한</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="warning" class="disabled">빈칸을 입력해 주세요.</div>
            <button id="signup" type="button" class="button" onClick={SignUpReq}>회원가입</button>
        </div>
    </Layout>;
};

export default Signup;