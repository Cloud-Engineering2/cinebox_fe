import React, { useState, useEffect } from 'react';

export default function SearchBox({placeholder}) {
    const style={
        height: 33,
        background: '#E8E8E8',
        color: '#727272',
        border: 'none',
        borderEadius: 6,
        padding: 5,
        boxSizing: 'border-box'
    }

    return <input id='searchMovie' type='text' style={{style}} placeholder={placeholder}/>;
}
