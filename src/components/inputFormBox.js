import { Box, TextField } from '@mui/material';
import React from 'react';
import "../styles/components/inputFormBox.css";
import BasicDatePicker from './datePicker';
import DateTimePicker from './dateTimePicker.js';

const InputFormBox = ({ inputs, style }) => {
    return <>
        {inputs.map((input) => {
            return <Box key={input.id} className='inputFormBox selectBox'>
                <label for={input.id} className='label'>{input.label}</label>
                {
                    input.type == 'select' ? <select id={input.id} disabled={input.disabled}>
                        {
                            input?.items?.map(item => { return <option value={item.value} selected={item.value == (input.defaultValue ? input.defaultValue : input?.items[0].value)} >{item.label}</option> })
                        }
                    </select>
                        : input.type == 'datepicker' ? <BasicDatePicker className={input.id} value={input.value} />
                            : input.type == 'datetimepicker' ? <DateTimePicker className={input.id} value={input.value} />
                                : <TextField id={input.id} variant="standard" sx={style} defaultValue={input.value} placeholder={input.placeholder} disabled={input.disabled} />

                }
            </Box>;
        })}
    </>;
};

export default InputFormBox;