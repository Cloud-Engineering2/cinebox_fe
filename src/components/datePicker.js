import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';

export default function BasicDatePicker({ label, className, value }) {
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