import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

export default function BasicDatePicker({label, className, value}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <Box className='flex'>
                    {label && <label className='mr-12 color-light-gray'>{label}</label>}
                    <DatePicker className={className} value={dayjs(value ? value : new Date())} />
                </Box>
            </DemoContainer>
        </LocalizationProvider>
    );
}