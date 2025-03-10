import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useReq from '../hooks/useReq';

export default function KakaoRedirect() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();

    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_KAKAO_LOGIN_API, null);
    
    useEffect(()=>{
        if(code){
            doRequest(process.env.REACT_APP_KAKAO_CALLBACK_API + `?code=${code}`, {
                method: "GET"
            });
        }
    },[]);
    useEffect(()=>{
        if(data){
            navigate('/', {state: data});
        }
    },[data]);
    useEffect(()=>{
        if(error){
            if(error.status == 401){
                navigate('/kakaoSignup', {state: error.response.data});
            }else{
                alert('로그인 오류');
                window.location.href='/';
            }
        }
    },[error]);

    return <Box>Kakao Redirect Page</Box>;
}
