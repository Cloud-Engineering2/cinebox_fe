import * as React from 'react';
import { Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function BasicDateTimePicker({ label, className, value }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <Box className='flex'>
                    {label && <label className='mr-12 color-light-gray'>{label}</label>}
                    <DateTimePicker className={className} value={dayjs(value ? value : new Date())} />
                </Box>
            </DemoContainer>
        </LocalizationProvider>
    );
}
