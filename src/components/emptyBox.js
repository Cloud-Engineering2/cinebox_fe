import { Box } from '@mui/material';
import React from 'react';

const EmptyBox = ({text}) => {

    const style={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#1a5e32'
    }

    return (
        <Box style={style}>
            {text}
        </Box>
    );
};

export default EmptyBox;
