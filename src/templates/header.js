import React from 'react';
import '../styles/templates/header.css';

const Header = () => {
	const token = localStorage.getItem('token');
	const identifier = localStorage.getItem('identifier');
	const role = localStorage.getItem('role');

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("identifier");
		localStorage.removeItem("role");

		window.location.href = '/';
	}

	return <>
		<div class="header">
			<div class="top-header">
				<div>
					<a href='/mypage' id="myPage">마이페이지</a>
					{role == 'ADMIN' && <a href='/admin' id="moveAdmin">어드민 페이지</a>}
					<a href='/bookings' id="moveBookings">예매 목록</a>
				</div>
				<div>
					{token != null && <a id="logout" onClick={logout}>로그아웃</a>}
					{token == null && <a href='/signup' id="signup">회원가입</a>}
					<a href='/quickBookings' id="quickBooking">빠른예매</a>
				</div>
			</div>
			<div class="bottom-header">
				<div class="logo">
					<a href='/'>
						<img src={'/assets/cinebox_logo.png'} />
					</a>
				</div>
			</div>
		</div>
	</>;
};

export default Header;