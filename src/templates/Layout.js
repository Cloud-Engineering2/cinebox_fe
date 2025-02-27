import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import { Box } from '@mui/material';

const Layout = (props) => {
    return <>
        <Header/>
            <Box style={{marginTop:116, minHeight:'calc(100vh - 239px)'}}>
                {props.children}
            </Box>
        <Footer/>
    </>;
};

export default Layout;