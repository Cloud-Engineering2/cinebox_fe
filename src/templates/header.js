import React, { useState, useEffect } from 'react';
import header from '../styles/templates/header.css';
import { logout } from '../utils';
import { Box } from '@mui/material';

const Header = () => {
	const token = localStorage.getItem('token');
    const identifier = localStorage.getItem('identifier');
    const role = localStorage.getItem('role');
	const userId = localStorage.getItem('userId');

    return <>
	<Box className="header">
		<Box className="top-header">
			<Box>
				{userId && <a href='/mypage' id="myPage">마이페이지</a>}
				{role == 'ADMIN' && <a href='/admin' id="moveAdmin">어드민 페이지</a>}
			</Box>
			<Box>
				{token && <a id="logout" onClick={logout}>로그아웃</a>}
				{!token && <a href='/signup' id="signup">회원가입</a>}
				{token && <a href='/quickBooking' id="quickBooking">빠른예매</a>}
			</Box>
		</Box>
		<Box className="bottom-header">
			<Box className="logo">
				<a href={token ? '/main' : '/'}>
					<img src={'/assets/cinebox_logo.png'}/>
				</a>
			</Box>
		</Box>
	</Box>
    </>;
};

export default Header;