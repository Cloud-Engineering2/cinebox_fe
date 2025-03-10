import { Box } from '@mui/material';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { AppContext } from "../../App.js";
import InputFormBox from '../../components/inputFormBox.js';
import useReq from '../../hooks/useReq.js';
import { convertDateFormatter } from '../../utils/index.js';
import { showToast } from '../../utils/toast.js';

const MovieForm = ({ setShowModal, data = null }) => {
    const { context, setContext } = useContext(AppContext);
    const { data: addMovieRes, isLoading: isAddMovieLoading, error: addMovieError, doRequest: doAddMovieRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);
    const { data: updateMovieRes, isLoading: isUpdateMovieLoading, error: updateMovieError, doRequest: doUpdateMovieRequest } = useReq(process.env.REACT_APP_MOVIE_API, null);
    const inputs = useMemo(() => [
        {
            id: 'title',
            label: '영화제목',
            value: data && data.title
        },
        {
            id: 'releaseDate',
            label: '개봉일',
            type: 'datepicker',
            value: data && data.releaseDate
        },
        {
            id: 'runtime',
            label: '러닝타임',
            value: data && data.runtime
        },
        {
            id: 'ratingGrade',
            label: '관람등급',
            defaultValue: data && data.ratingGrade,
            type: 'select',
            items: [{
                label: '전체관람가',
                value: '전체관람가'
            }, {
                label: '15세이상관람가',
                value: '15세이상관람가'
            }, {
                label: '12세이상관람가',
                value: '12세이상관람가'
            }, {
                label: '청소년관람불가',
                value: '청소년관람불가'
            }]
        },
        {
            id: 'genre',
            label: '장르',
            value: data && data.genre
        },
        {
            id: 'director',
            label: '감독',
            value: data && data.director
        },
        {
            id: 'actors',
            label: '출연진',
            value: data && data.actors
        },
        {
            id: 'status',
            label: '상영여부',
            type: 'select',
            items: [{
                label: 'SHOWING',
                value: 'SHOWING'
            }, {
                label: 'UPCOMING',
                value: 'UPCOMING'
            }, {
                label: 'ENDED',
                value: 'ENDED'
            }, {
                label: 'UNRELEASED',
                value: 'UNRELEASED'
            }]
        },
        {
            id: 'plot',
            label: '영화 설명',
            value: data && data.plot
        }
    ], [data]);

    const remove = useCallback(() => {
        const image = document.querySelector('#image');
        image.value = null;
    }, [])
    const add = useCallback(() => {
        const title = document.querySelector('#title').value;
        const releaseDate = document.querySelector('.releaseDate input').value;
        const runtime = document.querySelector('#runtime').value;
        const ratingGrade = document.querySelector('#ratingGrade').value;
        const genre = document.querySelector('#genre').value;
        const director = document.querySelector('#director').value;
        const actors = document.querySelector('#actors').value;
        const status = document.querySelector('#status').value;
        const image = document.querySelector('#image').files[0];
        const plot = document.querySelector('#plot').value;

        let formData = new FormData();
        formData.append('movie', new Blob([JSON.stringify({
            title: title,
            releaseDate: convertDateFormatter(releaseDate),
            runtime: runtime,
            ratingGrade: ratingGrade,
            genre: genre,
            director: director,
            actors: actors,
            status: status,
            plot: plot
        })], { type: "application/json" }));

        formData.append('image', image);

        doAddMovieRequest(process.env.REACT_APP_MOVIE_API, {
            method: 'POST',
            data: formData
        });
    }, [])
    const update = useCallback(() => {
        const title = document.querySelector('#title').value;
        const releaseDate = document.querySelector('.releaseDate input').value;
        const runtime = document.querySelector('#runtime').value;
        const ratingGrade = document.querySelector('#ratingGrade').value;
        const genre = document.querySelector('#genre').value;
        const director = document.querySelector('#director').value;
        const actors = document.querySelector('#actors').value;
        const status = document.querySelector('#status').value;
        const image = document.querySelector('#image').files[0];
        const plot = document.querySelector('#plot').value;

        let formData = new FormData();
        formData.append('movie', new Blob([JSON.stringify({
            title: title,
            releaseDate: convertDateFormatter(releaseDate),
            runtime: runtime,
            ratingGrade: ratingGrade,
            genre: genre,
            director: director,
            actors: actors,
            status: status,
            plot: plot
        })], { type: "application/json" }));

        formData.append('image', image);

        doUpdateMovieRequest(process.env.REACT_APP_MOVIE_API + `/${data.movieId}`, {
            method: 'PUT',
            data: formData
        });
    }, [])

    useEffect(() => {
        if (addMovieRes != null) {
            document.querySelector('#title').value = '';
            document.querySelector('#runtime').value = '';
            document.querySelector('#ratingGrade').value = '';
            document.querySelector('#genre').value = '';
            document.querySelector('#director').value = '';
            document.querySelector('#actors').value = '';
            document.querySelector('#status').value = '';
            document.querySelector('#image').value = '';
            document.querySelector('#plot').value = '';

            showToast('성공적으로 영화가 추가되었습니다.', 'success');
        }
    }, [addMovieRes])
    useEffect(() => {
        if (updateMovieRes != null) {
            showToast('성공적으로 영화가 수정되었습니다.', 'success');
            window.location.reload()
        }
    }, [updateMovieRes])
    useEffect(() => {
        if (addMovieError || updateMovieError) {
            showToast('입력 값을 다시 확인해 주세요.', 'warn');
        }
    }, [addMovieError, updateMovieError])


    return <>
        <h2 className='mb-14'>{data ? '영화 수정' : '영화 등록'}</h2>
        <Box className='form mb-44'>

            <InputFormBox inputs={inputs} style={{ width: '75%' }} />
        </Box>
        <h2 className='mb-14'>대표 이미지</h2>
        <Box className='uploadForm'>
            <Box>
                <input id='image' type="file" />
            </Box>
            <button id="remove" type="buttpon" className="button-sm mr-6" onClick={remove}>삭제</button>
        </Box>
        <Box className='controlBox mt-18'>
            <button id="save" type="button" className="button-sm mr-6" onClick={data != null ? update : add}>저장</button>
            <button id="back" type="button" className="button-sm" onClick={() => setShowModal(false)}>뒤로</button>
        </Box>
    </>;
};

export default MovieForm;