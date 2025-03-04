import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField } from '@mui/material';
import inputFormBox from "../styles/components/inputFormBox.css";

const InputFormBox = ({ inputs, style }) => {
    return <>
        {inputs.map((input) => {
            return <Box key={input.id} className='inputFormBox'>
                <label for={input.id} className='label'>{input.label}</label>
                <TextField id={input.id} variant="standard" sx={style} defaultValue={input.value} disabled={input.disabled} />
            </Box>;
        })}
    </>;
};

export default InputFormBox;