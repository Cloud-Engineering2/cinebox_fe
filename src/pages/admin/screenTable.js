import React, { useState, useEffect, useContext } from 'react';
import useReq from '../../hooks/useReq.js';
import screenTable from '../../styles/components/screenTable.css';
import { AppContext } from "../../App.js";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { splitDateTime } from '../../utils/index.js';
import UnderBarTitle from '../../components/underBarTitle.js';
import { useParams } from 'react-router-dom';
import EmptyBox from '../../components/emptyBox.js';
import Modal from '../../components/modal.js';
import ScreenForm from './screenForm.js';

const ScreenTable = () => {
    const { movieId } = useParams();
    const {context, setContext} = useContext(AppContext);
    const [groupedScreensByDate, setGroupedScreensByDate] = useState([]);
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [showEditScreen, setShowEditScreen] = useState({screenId: null, state: false});

    const { data: getMovieScreensRes, isLoading: isGetMovieScreensLoading, error: getMovieScreensError, doRequest: doGetMovieScreensRequest } = useReq(process.env.REACT_APP_SCREEN_API, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        });
    const { data: deleteMovieRes, isLoading: isDeleteMovieLoading, error: deleteMovieError, doRequest: doDeleteMovieRequest } = useReq(process.env.REACT_APP_SCREEN_API, null);
    
    useEffect(()=>{
        if(getMovieScreensRes){
            console.log(getMovieScreensRes);
            const newScreens = groupedScreensByDate.concat(getMovieScreensRes);
            setGroupedScreensByDate(newScreens);
        }
    },[getMovieScreensRes])
    
    const deleteScreen = (screenId)=>{
        doDeleteMovieRequest(process.env.REACT_APP_SCREEN_API + `/${screenId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })
        document.querySelector(`.screen_${screenId}`).remove();
    }

    return <>
        <UnderBarTitle title={'상영정보 조회'}/>
        <Box className='screenTable'>
            {showAddScreen && <Modal className='flex jsfy-cnt-rght mb-10' content={<ScreenForm setShowModal={setShowAddScreen} />}/>}
            <Box className='flex jsfy-cnt-rght mb-10'>
                <button id="addScreen" type="button" className="button-sm fs-23" onClick={()=>setShowAddScreen(true)}>+</button>
            </Box>
            {
                groupedScreensByDate ? groupedScreensByDate.map(screen =>{
                    return <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography className='screenDate' component="span">{screen.date}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Box>
                        {
                            screen.auditoriums.map(audit=>{
                                return <Box key={`screen_${audit.auditoriumId}`} id={`screen_${audit.auditoriumId}`} className='flex jsfy-cnt-spc-btwn mb-14'>
                                    <Box>
                                        <span className='startTime mr-6'>{audit.startTime && splitDateTime(audit.screens.startTime).time}</span>
                                        <span>{`상영관 - ${audit.auditoriumId}`}</span>
                                    </Box>
                                    <Box>
                                        <button id="editScreen" type="button" className="button-sm mr-6" onClick={()=>setShowEditScreen({screenId: audit.screenId, state: true})} >수정</button>
                                        <button id="deleteScreen" type="button" className="button-sm" onClick={()=>deleteScreen(audit.auditoriumId)}>삭제</button>
                                    </Box>
                                </Box>
                            })
                        }
                    </Box>
                    </AccordionDetails>
                    </Accordion>
                }) : <EmptyBox text="상영정보가 없습니다."/>
            }
        </Box>
        {showEditScreen.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<ScreenForm setShowModal={setShowEditScreen} data={getMovieScreensRes.filter(dt => dt.screenId == showEditScreen.screenId)[0]}/>}/>}
    </>
};

export default ScreenTable;