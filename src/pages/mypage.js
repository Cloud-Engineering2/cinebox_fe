import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../styles/pages/mypage.css';
import { Box } from '@mui/material';
import { AppContext } from "../App.js";
import BookingCard from '../components/bookingCard.js';
import EmptyBox from '../components/emptyBox.js';
import Modal from '../components/modal.js';
import MovieCard from '../components/movieCard.js';
import ReviewList from '../components/reviewList.js';
import UnderBarTitle from '../components/underBarTitle.js';
import useReq from '../hooks/useReq.js';
import UserForm from './admin/userForm.js';
import { showToast } from '../utils/toast.js';

const Mypage = () => {
    const { context, setContext } = useContext(AppContext);
    const [movies, setMovies] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showBookingList, setShowBookingList] = useState(false);
    const [showEditUser, setShowEditUser] = useState({ userId: null, state: false });

    const { data: logoutRequest, isLoading: isLogoutLoading, error: logoutError, doRequest: doLogoutRequest } = useReq(null, null);
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_USER_API + `/${context.userId}`, {
        method: 'GET'
    });
    const { data: likeMoviesRes, isLoading: isGetLikeMoviesReqLoading, error: getLikeMoviesReqError, doRequest: doGetLikeMoviesRequest } = useReq(process.env.REACT_APP_MOVIE_API + '/likes', {
        method: 'GET'
    });
    const { data: bookingRes, isLoading: isBookingReqLoading, error: getBookingReqError, doRequest: doGetBookingRequest } = useReq(process.env.REACT_APP_BOOKING_API + '/my', {
        method: 'GET'
    });
    const { data: reviewRes, isLoading: isReviewLoading, error: getReviewsError, doRequest: doGetReviewRequest } = useReq(process.env.REACT_APP_REVIEW_API + `/my`, {
        method: 'GET'
    });
    const { data: deleteUserRes, isLoading: isDeleteUserLoading, error: deleteUserError, doRequest: doDeleteUserRequest } = useReq(process.env.REACT_APP_USER_API + `/${context.userId}`, null);
    
    useEffect(() => {
        setMovies(likeMoviesRes);
    }, [likeMoviesRes]);
    useEffect(() => {
        setBookingList(bookingRes);
    }, [bookingRes]);
    useEffect(() => {
        setReviews(reviewRes);
    }, [reviewRes]);
    useEffect(() => {
        if (showBookingList) {
            document.querySelector('.favoriteMovieLabel').style.display = 'none';
            document.querySelector('.favoriteMovie').style.display = 'none';
            document.querySelector('.movieStoryLabel').style.display = 'none';
            document.querySelector('.movieStory').style.display = 'none';
            document.querySelector('.bookingList').style.height = 'auto';
            document.querySelector('.more').style.display = 'none';
        }
    }, [showBookingList]);
    useEffect(() => {
		if (isLogoutLoading) window.location.href = '/';
	}, [isLogoutLoading])
	useEffect(() => {
		if (logoutError) showToast('로그아웃에 실패하였습니다.', 'error');
	}, [logoutError])

    const logout = () => {
        localStorage.clear();
		doLogoutRequest(process.env.REACT_APP_LOGOUT_URL, {
			method: 'POST'
		})
	}
    const deleteUser = useCallback(() => {
        doDeleteUserRequest(process.env.REACT_APP_USER_API + `/${context.userId}/withdraw`, {
            method: 'POST'
        });
        logout();
    }, [])


    return <>
        <UnderBarTitle title={'나의 시네박스'} />
        <Box style={{ margin: '50px 27%' }}>
            <Box className='userInfoBox mb-44'>
                <Box className='welcome mr-20'>
                    <img src='/assets/Welcome.png' />
                </Box>
                <Box className='welcomeText'>
                    안녕하세요! <br />{context.identifier} 님
                </Box>
                <Box className='userControlBox'>
                    <span className='mr-12 pointer' onClick={() => setShowEditUser({ userId: context.userId, state: true })}>개인정보수정</span>
                    {context.role != 'ADMIN' && <span className='pointer' onClick={deleteUser}>회원 탈퇴</span>}
                </Box>
            </Box>
            <UnderBarTitle className='favoriteMovieLabel' title={'기대되는 영화'} styles={{ margin: 'none' }} />
            <Box className='favoriteMovie'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                imgUrl={movie.posterImageUrl ? movie.posterImageUrl : '/assets/noImage.png'}
                                styles={{
                                    card: {
                                        width: 130,
                                        height: 220,
                                        marginRight: '36px',
                                        marginBottom: '36px'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox text="좋아요를 눌러보세요." />
                }
            </Box>
            <Box className='pstn-relative'>
                <Box className='more pstn-absolute pstn-right color-gray pointer' onClick={() => { setShowBookingList(true) }}>{'더보기 >'}</Box>
                {/* <Box className='prev pstn-absolute pstn-right color-gray pointer' onClick={()=>{setShowBookingList(false)}}>{'이전으로 >'}</Box> */}
                <UnderBarTitle title={'MY 예매내역'} styles={{ margin: 'none' }} />
                <Box className='mt-10 fs-13 bold color-gray'>총 {bookingList ? bookingList.length : 0}건</Box>
                <Box className='bookingList'>
                    {
                        bookingList ? bookingList.map((booking) => {
                            return <BookingCard booking={booking} />;
                        }) : <EmptyBox text="예매 내역이 없습니다." />
                    }
                </Box>
            </Box>
            <UnderBarTitle className='movieStoryLabel' title={'MY 무비스토리'} styles={{ margin: 'none' }} />
            <Box className='movieStory'>
                {
                    reviews ? (
                        <ReviewList
                            reviews={reviews.slice().reverse()}
                            styles={{
                                width: '98%',
                                maxWidth: 'none',
                                height: 30
                            }}
                            noEdit={true} />
                    ) : <EmptyBox text="리뷰가 없습니다." />
                }
            </Box>
        </Box>
        {showEditUser.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<UserForm setShowModal={setShowEditUser} data={data} />} />}
    </>;
};

export default Mypage;