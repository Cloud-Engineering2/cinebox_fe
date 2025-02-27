import React, { useState, useEffect } from 'react';
import {Card, Box, Button} from '@mui/material';

export default function AgeLogo({age, color}) {
    const style={
        width: 20,
        height: 20,
        background: 'yellow',
        color: 'white',
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: '3px',
        fontSize: 13,
        marginRight: 6
    }

    return (
        <Box style={style}>{age}</Box>
    );
}
