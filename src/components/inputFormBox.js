import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField } from '@mui/material';
import inputFormBox from "../styles/components/inputFormBox.css";

const InputFormBox = ({inputs, style}) => {
    return <>
        {inputs.map((input)=>{
            return <Box className='inputFormBox'>
                <label for={input.id} className='label'>{input.label}</label>
                <TextField id={input.id} variant="standard" sx={style} defaultValue={input.value} />
            </Box>;
        })}
    </>;
};

export default InputFormBox;