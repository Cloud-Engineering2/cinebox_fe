import React, { useState, useEffect, useContext } from 'react';
import useReq from '../hooks/useReq.js';
import { Box, TextField } from '@mui/material';
import { AppContext } from "../App.js";
import inputFormBox from "../styles/components/inputFormBox.css";

const InputFormBox = ({inputs, style}) => {
    const {context, setContext} = useContext(AppContext);

    return <>
        {inputs.map((input)=>{
            return <Box className='inputFormBox'>
                <label for={input.id} className='label'>{input.label}</label>
                <TextField id={input.id} variant="standard" sx={style} />
            </Box>;
        })}
    </>;
};

export default InputFormBox;