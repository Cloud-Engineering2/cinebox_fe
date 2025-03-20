import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { AppContext } from "../App.js";
import useReq from '../hooks/useReq';
import '../styles/templates/header.css';
import { showToast } from '../utils/toast.js';

const Header = () => {
	const { context, setContext } = useContext(AppContext);
	const { data: logoutRequest, isLoading: isLogoutLoading, error: logoutError, doRequest: doLogoutRequest } = useReq(null, null);

	useEffect(() => {
		if (isLogoutLoading) window.location.href = '/';
	}, [isLogoutLoading])
	useEffect(() => {
		if (logoutError) showToast('로그아웃에 실패하였습니다.', 'error');
	}, [logoutError])
	const logout = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('role');
		localStorage.removeItem('identifier');
		doLogoutRequest(process.env.REACT_APP_LOGOUT_URL, {
			method: 'POST'
		})
	}

	return <>
		<Box className="header">
			<Box className="top-header">
				<Box>
					{context.userId && <a href='/mypage' id="myPage">마이페이지main </a>}
					{context.role == 'ADMIN' && <a href='/admin' id="moveAdmin">어드민 페이지</a>}
				</Box>
				<Box>
					{context.userId && <a id="logout" onClick={logout}>로그아웃</a>}
					{!context.userId && <a href='/signup' id="signup">회원가입</a>}
					{context.userId && <a href='/quickBooking' id="quickBooking" style={{ display: 'none' }}>빠른예매</a>}
				</Box>
			</Box>
			<Box className="bottom-header">
				<Box className="logo">
					<a href={context.userId ? '/main' : '/'}>
						<img src={'/assets/cinebox_logo.png'} />
					</a>
				</Box>
			</Box>
		</Box>
	</>;
};

export default Header;
