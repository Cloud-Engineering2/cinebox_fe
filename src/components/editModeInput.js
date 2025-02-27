import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {Box, Input, MenuItem, TextField} from '@mui/material';
import editModeInput from '../styles/components/editModeInput.css';
import MenuButton from './memuButton.js';

export default function EditModeInput({editMode = false, id, text, menus}) {

    const [isEdit, setisEdit] = useState(editMode);

    useEffect(()=>{
        setisEdit(editMode);
    },[editMode])

    return (
        <>
        {
            !isEdit ? <Box className='textModeBox'>
                <Box>
                    <Typography
                        className={`textField${id}`}
                        variant="body2" 
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2, // 2줄까지 표시
                            overflow: 'hidden',
                        }}
                    >
                        {text}
                    </Typography>
                </Box>
                <Box className='ExButton'>
                    <MenuButton
                        items={menus.map(menu=>{
                            return {
                                label: menu.label,
                                onClick: menu.onClick,
                                disabled: menu.disabled
                            }
                        })}
                    />
                </Box>
            </Box> :
            <Box className='editMode'>
                <Input
                    className={`editInput editField${id}`}
                    sx={{
                        width: '100%',
                        border: '1px solid #e8e8e8',                                            
                        borderRadius: '4px'
                    }}
                />
                <Box className='editButton'>
                    <img src={'/assets/arrow_gray.png'}/>
                </Box>
            </Box>
        }
        </>
    );
}
