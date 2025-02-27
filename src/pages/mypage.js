import React, { useState, useEffect, useContext } from 'react';
import useReq from '../hooks/useReq.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { Box } from '@mui/material';
import { AppContext } from "../App.js";
import mypage from '../styles/pages/mypage.css'
import MovieCard from '../components/movieCard.js';
import EmptyBox from '../components/emptyBox.js';
import WideMovieCard from '../components/wideMovieCard.js';

const Mypage = () => {
    const {context, setContext} = useContext(AppContext);
    const [movies, setMovies] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_MOVIE_API, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${context.token}`
        }
    });
    const { data: bookingResponse, isLoading: isBookingReqLoading, error: getBookingReqError, doRequest: doGetBookingRequest } = useReq(process.env.REACT_APP_BOOKING_API + '/my', {
        method: 'GET',
        headers: {
                'Authorization': `Bearer ${context.token}`
        }
    });

    useEffect(()=>{
        setMovies(data);
    },[data]);
    useEffect(()=>{
        setBookingList(bookingResponse);
    },[bookingResponse]);

    return <>
        <UnderBarTitle title={'나의 시네박스'}/>
        <Box style={{margin: '50px 27%'}}>
            <Box className='userInfoBox mb-44'>
                <Box className='welcome mr-20'>
                    <img src='/assets/Welcome.png'/>
                </Box>
                <Box className='welcomeText'>
                    안녕하세요! <br/>{context.identifier} 님
                </Box>
                <Box className='userControlBox'>
                    <span className='mr-12'>개인정보수정</span>
                    <span>회원 탈퇴</span>
                </Box>
            </Box>
            <UnderBarTitle title={'기대되는 영화'} styles={{margin: 'none'}}/>
            <Box className='favoriteMovie'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                imgUrl='/assets/movie1.jpg'
                                styles={{
                                    card : {
                                        width : 140,
                                        height: 200,
                                        marginRight:'36px',
                                        marginBottom: '36px'
                                    },
                                    img : {
                                        width: '100%'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox/>
                }
            </Box>
            <UnderBarTitle title={'MY 예매내역'} styles={{margin: 'none'}}/>
            <Box className='bookingList'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <WideMovieCard
                                movie={movie}
                                content1={<p>{movie.releaseDate}</p>}
                                content2={<p>{context.identifier}&nbsp;&nbsp;|&nbsp;&nbsp;{movie.releaseDate}</p>}
                                imgUrl='/assets/movie1.jpg'
                                styles={{
                                    card : {
                                        marginBottom: '36px'
                                    },
                                    img : {
                                        width: '100%'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox/>
                }
            </Box>
            <UnderBarTitle title={'MY 무비스토리'} styles={{margin: 'none'}}/>
            <Box className='movieStory'>
                {
                    movies ? movies.map((movie) => {
                        return (
                            <WideMovieCard
                                movie={movie}
                                content1={<p>{context.identifier}&nbsp;&nbsp;|&nbsp;&nbsp;{movie.releaseDate}</p>}
                                content2={<p>{context.identifier}&nbsp;&nbsp;|&nbsp;&nbsp;{movie.releaseDate}</p>}
                                imgUrl='/assets/movie1.jpg'
                                styles={{
                                    card : {
                                        marginBottom: '36px'
                                    },
                                    img : {
                                        width: '100%'
                                    }
                                }}
                            />
                        );
                    }) : <EmptyBox/>
                }
            </Box>
        </Box>
        {JSON.stringify(bookingResponse)}
    </>;
};

export default Mypage;