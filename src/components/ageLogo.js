import React, { useState, useEffect } from 'react';
import {Card, Box, Button} from '@mui/material';

export default function AgeLogo({age, color}) {
    const style={
        width: 18,
        height: 18,
        background: color,
        color: 'white',
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: '3px',
        fontSize: 11,
        marginRight: 6
    }

    return (
        <Box style={style}>{age}</Box>
    );
}
