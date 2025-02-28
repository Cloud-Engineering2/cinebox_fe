import React, { useState, useEffect, useContext } from 'react';
import useReq from '../../hooks/useReq.js';
import UnderBarTitle from '../../components/underBarTitle.js';
import { Box } from '@mui/material';
import { AppContext } from "../../App.js";
import admin from '../../styles/pages/admin.css';
import Tabs from '../../components/tabs.js';
import MovieForm from './movieForm.js';
import UserForm from './userForm.js';

const Admin = () => {
    const {context, setContext} = useContext(AppContext);

    return <>
        <UnderBarTitle title={'관리자 페이지'}/>
        <Box className='admin'>
            <Tabs tabs={[
                {
                    value:'영화 관리',
                    content:<MovieForm/>
                },{
                    value:'회원 관리',
                    content:<UserForm/>
                }
            ]}
            styles={{}}/>
        </Box>
    </>;
};

export default Admin;