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
    const [screens, setScreens] = useState([]);
    const [groupedByDate, setGroupedByDate] = useState([]);
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [showEditScreen, setShowEditScreen] = useState({screenId: null, state: false});
    
    const { data: getMovieScreensDateRes, isLoading: isGetMovieScreensDateLoading, error: getMovieScreensDateError, doRequest: doGetMovieScreensDateRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/dates`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${context.token}`
        }
    });
    const { data: getMovieScreensRes, isLoading: isGetMovieScreensLoading, error: getMovieScreensError, doRequest: doGetMovieScreensRequest } = useReq(process.env.REACT_APP_MOVIE_API + `/${movieId}/screens`, null);
    const { data: deleteMovieRes, isLoading: isDeleteMovieLoading, error: deleteMovieError, doRequest: doDeleteMovieRequest } = useReq(process.env.REACT_APP_SCREEN_API, null);
    
    useEffect(()=>{
        if(getMovieScreensDateRes){
            getMovieScreensDateRes.map((date)=>{
                doGetMovieScreensRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/screens`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${context.token}`
                    },
                    params: {
                        "date": date
                    }
                })
            })
        }
    },[getMovieScreensDateRes])
    useEffect(()=>{
        if(getMovieScreensRes){
            const newScreens = screens.concat(getMovieScreensRes);
            setScreens(newScreens);
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
    // TO-DO: grouping 하기ㅇ
    // const groupingScreensByDate = ()=>{
    //     if(screens){
    //         const groupedByDate={};
    //         screens.map((screen, idx) => {
    //             const date = screen.startTime.split("T")[0]; // "2025-02-27"
                
    //             if (!groupedByDate[date]) {
    //                 groupedByDate[date] = [];
    //             }
                
    //             groupedByDate[date].push(screen);
    //         });
    //         setGroupedByDate(groupedByDate);
    //     }
    // }

    return <>
        <UnderBarTitle title={'상영정보 조회'}/>
        <Box className='screenTable'>
            {showAddScreen && <Modal className='flex jsfy-cnt-rght mb-10' content={<ScreenForm setShowModal={setShowAddScreen} />}/>}
            <Box className='flex jsfy-cnt-rght mb-10'>
                <button id="addScreen" type="button" className="button-sm fs-23" onClick={()=>setShowAddScreen(true)}>+</button>
            </Box>
            {
                groupedByDate ? Object.keys(groupedByDate).map(date =>{
                    return <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography className='screenDate' component="span">{date}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Box>
                        {
                            groupedByDate[date].map(dt=>{
                                return <Box key={`screen_${dt.screenId}`} id={`screen_${dt.screenId}`} className='flex jsfy-cnt-spc-btwn mb-14'>
                                    <Box>
                                        <span className='startTime mr-6'>{splitDateTime(dt.startTime).time}</span>
                                        <span>{`상영관 - ${dt.auditoriumId}`}</span>
                                    </Box>
                                    <Box>
                                        <button id="editScreen" type="button" className="button-sm mr-6" onClick={()=>setShowEditScreen({screenId: dt.screenId, state: true})} >수정</button>
                                        <button id="deleteScreen" type="button" className="button-sm" onClick={()=>deleteScreen(dt.screenId)}>삭제</button>
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