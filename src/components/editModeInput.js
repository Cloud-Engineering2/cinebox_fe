import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {Box, Input, MenuItem, TextField} from '@mui/material';
import editModeInput from '../styles/components/editModeInput.css';
import button from '../styles/button.css';
import MenuButton from './memuButton.js';

export default function EditModeInput({id, text, events}) {
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(text);

    const editHandler = ()=>{
        const content = document.querySelector(`.editField${id} input`).value;
        events.edit(content, 33);
        setIsEdit(false);
        setContent(content);
    }

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
                        {content}
                    </Typography>
                </Box>
                <Box className='ExButton'>
                    <MenuButton
                        items={[
                            {
                                label: '수정',
                                onClick: ()=>setIsEdit(true),
                            },
                            {
                                label: '삭제',
                                onClick: events.remove,
                            }
                        ]}
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
                <Box className='editButton button-sm' onClick={editHandler}>
                    수정
                </Box>
            </Box>
        }
        </>
    );
}
