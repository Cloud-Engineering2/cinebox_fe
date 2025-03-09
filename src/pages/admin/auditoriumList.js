import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import EmptyBox from '../../components/emptyBox.js';
import { Box } from '@mui/material';
import Modal from '../../components/modal.js';
import '../../styles/pages/admin.css';
import AuditoriumForm from './auditoriumForm.js';

const AuditoriumList = () => {
    const [showAddAuditorium, setShowAddAuditorium] = useState(false);
    const [showEditAuditorium, setShowEditAuditorium] = useState({ auditoriumId: null, state: false });

    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_AUDITORIUM_API, {
        method: 'GET'
    });
    const { data: deleteAuditoriumRes, isLoading: isDeleteAuditoriumLoading, error: deleteAuditoriumError, doRequest: doDeleteAuditoriumRequest } = useReq(process.env.REACT_APP_AUDITORIUM_API, null);

    const deleteAuditorium = useCallback((auditoriumId) => {
        doDeleteAuditoriumRequest(process.env.REACT_APP_AUDITORIUM_API + `/${auditoriumId}`, {
            method: 'DELETE'
        })
        document.querySelector(`#auditorium_${auditoriumId}`).remove();
    }, [])

    return <>
        {showAddAuditorium && <Modal className='flex jsfy-cnt-rght mb-10' content={<AuditoriumForm setShowModal={setShowAddAuditorium} />} />}
        <Box className='flex jsfy-cnt-rght mb-10'>
            <button id="addAuditorium" type="button" className="button-sm fs-23" onClick={() => setShowAddAuditorium(true)}>+</button>
        </Box>
        {
            data ? data.map(auditorium => {
                return <>
                    <Box
                        key={`auditorium_${auditorium.auditoriumId}`}
                        id={`auditorium_${auditorium.auditoriumId}}`}
                        style={{
                            marginBottom: 30,
                            border: '2px solid #004D09',
                            padding: 21,
                            borderRadius: 6
                        }}>
                        <Box>
                            <Box className='userCard flex'>
                                <p className='label'>상영관</p>
                                <p>{auditorium.auditoriumName}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>좌석수</p>
                                <p>{auditorium.auditoriumCapacity}</p>
                            </Box>
                        </Box>
                        <Box className='controlBox'>
                            <button id="edit" type="button" className="button-sm mr-6" onClick={() => setShowEditAuditorium({ auditoriumId: auditorium.auditoriumId, state: true })}>수정</button>
                            <button id="delete" type="button" className="button-sm" onClick={() => deleteAuditorium(auditorium.auditoriumId)} disabled>삭제</button>
                        </Box>
                    </Box>
                </>
            }) : <EmptyBox text="유저를 추가하세요." />
        }
        {showEditAuditorium.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<AuditoriumForm setShowModal={setShowEditAuditorium} data={data.filter(dt => dt.auditoriumId == showEditAuditorium.auditoriumId)[0]} />} />}
    </>;
};

export default AuditoriumList;