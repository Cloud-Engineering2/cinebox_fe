import React, { useState, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import '../../styles/components/screenTable.css';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { splitDateTime } from '../../utils/index.js';
import UnderBarTitle from '../../components/underBarTitle.js';
import { useParams } from 'react-router-dom';
import EmptyBox from '../../components/emptyBox.js';
import Modal from '../../components/modal.js';
import ScreenForm from './screenForm.js';

const ScreenTable = () => {
    const { movieId } = useParams();
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [showEditScreen, setShowEditScreen] = useState({ info: {date: null, auditoriumId: null, screenId: null}, state: false });

    const { data: getMovieScreensRes, isLoading: isGetMovieScreensLoading, error: getMovieScreensError, doRequest: doGetMovieScreensRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/screens`, {
        method: 'GET'
    });
    const { data: deleteMovieRes, isLoading: isDeleteMovieLoading, error: deleteMovieError, doRequest: doDeleteMovieRequest } = useReq(process.env.REACT_APP_SCREEN_API, null);


    const deleteScreen = useCallback((screenId) => {
        doDeleteMovieRequest(process.env.REACT_APP_SCREEN_API + `/${screenId}`, {
            method: 'DELETE'
        })
        document.querySelector(`#screen_${screenId}`).remove();
    },[])
    const getScreen = useCallback(({date, auditoriumId, screenId}) => {
        const filteredDate = getMovieScreensRes.filter(groupedData=> groupedData.date == date);
        const filteredAuditoriumId = filteredDate[0].auditoriums.filter(auditorium => auditorium.auditoriumId == auditoriumId);
        const filteredScreenId = filteredAuditoriumId[0].screens.filter(screen => screen.screenId == screenId);

        return Object.assign(filteredScreenId[0], {movieId : movieId});
    },[getMovieScreensRes])

    return <>
        <UnderBarTitle title={'상영정보 조회'} />
        <Box className='screenTable'>
            {showAddScreen && <Modal className='flex jsfy-cnt-rght mb-10' content={<ScreenForm setShowModal={setShowAddScreen} data={{movieId : movieId}} />} />}
            <Box className='flex jsfy-cnt-rght mb-10'>
                <button id="addScreen" type="button" className="button-sm fs-23" onClick={() => setShowAddScreen(true)}>+</button>
            </Box>
            {
                (getMovieScreensRes && getMovieScreensRes.length > 0) ? getMovieScreensRes.map(groupedData => {
                    return <Accordion className='accordion mb-14'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography className='screenDate' component="span">{groupedData.date}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                {
                                    groupedData.auditoriums.map(auditorium => {
                                        return <>{
                                            auditorium.screens.map(screen => {
                                                return <Box key={`screen_${screen.screenId}`} id={`screen_${screen.screenId}`}>
                                                    <Box className='flex jsfy-cnt-spc-btwn mb-14'>
                                                        <Box>
                                                            <span className='startTime mr-6'>{`${splitDateTime(screen.startTime).time} - ${splitDateTime(screen.endTime).time}`}</span>
                                                            <span>{screen.auditoriumName}</span>
                                                        </Box>
                                                        <Box>
                                                            <button id="editScreen" type="button" className="button-sm mr-6" onClick={() => setShowEditScreen({ info: {date: groupedData.date, auditoriumId: screen.auditoriumId, screenId: screen.screenId}, state: true })} >수정</button>
                                                            <button id="deleteScreen" type="button" className="button-sm" onClick={() => deleteScreen(screen.screenId)}>삭제</button>
                                                        </Box>
                                                    </Box>
                                                </Box>;
                                            })
                                        }</>
                                    })
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                }) : <EmptyBox text="상영정보가 없습니다." />
            }
        </Box>
        {showEditScreen.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<ScreenForm setShowModal={setShowEditScreen} data={getScreen(showEditScreen.info)} type='update' />} />}
    </>
};

export default ScreenTable;