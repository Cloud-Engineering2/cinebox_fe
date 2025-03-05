import React, { useState, useEffect, useContext, useCallback } from 'react';
import useReq from '../../hooks/useReq.js';
import EmptyBox from '../../components/emptyBox.js';
import { Box } from '@mui/material';
import UserForm from './userForm.js';
import Modal from '../../components/modal.js';
import '../../styles/pages/admin.css';

const UserList = () => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState({userId: null, state: false});

    const { data, isLoading, error, doRequest } = useReq(process.env.REACT_APP_USER_API, {
        method: 'GET'
    });
    const { data: deleteMovieRes, isLoading: isDeleteMovieLoading, error: deleteMovieError, doRequest: doDeleteMovieRequest } = useReq(process.env.REACT_APP_USER_API, null);

    const deleteUser = useCallback((userId)=>{
        doDeleteMovieRequest(process.env.REACT_APP_USER_API + `/${userId}`, {
            method: 'DELETE'
        })
        document.querySelector(`#user_${userId}`).remove();
    },[])

    return <>
        {showAddUser && <Modal className='flex jsfy-cnt-rght mb-10' content={<UserForm setShowModal={setShowAddUser} />}/>}
        <Box className='flex jsfy-cnt-rght mb-10'>
            <button id="addMovie" type="button" className="button-sm fs-23" onClick={()=>setShowAddUser(true)}>+</button>
        </Box>        {
            data ? data.map(user =>{
                return <>
                    <Box 
                    key={`user_${user.userId}`}
                    id={`user_${user.userId}`}
                    style={{
                        marginBottom: 30,
                        border: '2px solid #004D09',
                        padding: 21,
                        borderRadius: 6
                    }}>
                        <Box>
                            <Box className='userCard flex'>
                                <p className='label'>이름</p>
                                <p>{user.name}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>아이디</p>
                                <p>{user.identifier}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>이메일</p>
                                <p>{user.email}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>전화번호</p>
                                <p>{user.phone}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>나이</p>
                                <p>{user.age}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>성별</p>
                                <p>{user.gender}</p>
                            </Box>
                            <Box className='userCard flex'>
                                <p className='label'>역할</p>
                                <p>{user.role}</p>
                            </Box>
                        </Box>
                        <Box className='controlBox'>
                            <button id="edit" type="button" className="button-sm mr-6" onClick={()=>setShowEditUser({userId: user.userId, state: true})}>수정</button>
                            <button id="delete" type="button" className="button-sm" onClick={()=>deleteUser(user.userId)}>삭제</button>
                        </Box>
                    </Box>
                </>
            }) : <EmptyBox text="유저를 추가하세요."/>
        }
        {showEditUser.state && <Modal className='flex jsfy-cnt-rght mb-10' content={<UserForm setShowModal={setShowEditUser} data={data.filter(dt => dt.userId == showEditUser.userId)[0]}/>}/>}
    </>;
};

export default UserList;