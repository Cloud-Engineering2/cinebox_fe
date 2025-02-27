import React, { useState, useEffect, useContext } from 'react';
import useReq from '../hooks/useReq.js';
import UnderBarTitle from '../components/underBarTitle.js';
import { Box } from '@mui/material';
import { AppContext } from "../App.js";
import WideMovieCard from '../components/wideMovieCard.js';
import admin from '../styles/pages/admin.css'

const Admin = () => {
    const {context, setContext} = useContext(AppContext);

    return <>
        <UnderBarTitle title={'관리자 페이지'}/>
        <Box style={{margin: '50px 27%'}}>
            admnin Page
        </Box>
    </>;
};

export default Admin;