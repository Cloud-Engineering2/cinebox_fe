import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const UnderBarTitle = ({title}) => {

    const styles = {
        padding: '0px 10px 10px 10px',
        borderBottom: '2px solid #004D09',
        margin: '0px 40px',
        color: '#004D09',
        fontWeight: 600,
        fontSize: 18
    }

    return <>
        <Box style={styles}>
            {title}
        </Box>
    </>;
};

export default UnderBarTitle;