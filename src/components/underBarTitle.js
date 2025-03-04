import { Box } from '@mui/material';
import React from 'react';

const UnderBarTitle = ({className, title, styles}) => {

    const style = Object.assign({
        padding: '0px 10px 10px 10px',
        borderBottom: '2px solid #004D09',
        margin: title == undefined ? '30px 40px 0px 40px' : '0px 40px',
        color: '#004D09',
        fontWeight: 600,
        fontSize: 18,
        display: 'flex',
        justifyContent: 'space-between'
    },styles);

    return <Box className={className} style={style}>
            {title}
        </Box>;
};

export default UnderBarTitle;