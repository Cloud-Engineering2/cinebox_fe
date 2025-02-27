import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useReq from '../hooks/useReq.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Box, Input, MenuItem, TextField} from '@mui/material';
import reviewList from '../styles/components/reviewList.css';
import EditModeInput from './editModeInput.js';

export default function ReviewList({items, styles}) {
    const token = localStorage.getItem('token');

    const { data: editReviewResponse, isLoading: isReviewEditLoading, error: editReviewsError, doRequest: doEditReviewRequest } = useReq(null, null);
    const { data: deleteReviewResponse, isLoading: isReviewDeleteLoading, error: deleteReviewsError, doRequest: doDeleteReviewRequest } = useReq(null, null);

    const [editMode, setEditMode] = useState(false);

    const changeEditModeList = (movieId, reviewId)=>{
        document.querySelector(`.review${reviewId}`).style.display = 'none';
        //document.querySelector(`.reviewEditField${reviewId}`).style.display = 'block';
    }
    const editReviewHandler = (movieId, reviewId)=>{
        // doEditReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews/${reviewId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        //     data:{

        //     }
        // });
    }
    const deleteReviewHandler = (movieId, reviewId)=>{
        doDeleteReviewRequest(process.env.REACT_APP_MOVIE_API + `/${movieId}/reviews/${reviewId}`, {
            method: 'Delete',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        document.querySelector(`.reviewBox${reviewId}`).remove();
    }

    return (
        <List sx={Object.assign({ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }, styles)}>
        {
            items && items.map(item =>{
                console.log(item);
                return <Box className={`reviewBox${item.reviewId}`}>
                <ListItem alignItems="flex-start" width='100%'>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={
                        <React.Fragment>
                            <Box className='contentBox'>
                                <Box className='content1'>
                                    <Box>관람평</Box>
                                    <Box>{item.rating}</Box>
                                </Box>
                                <EditModeInput 
                                    id={item.reviewId}
                                    text={item.content}
                                    menus={[
                                        {
                                            label: '댓글 수정',
                                            onClick:()=>alert('edit'),
                                            disabled: true
                                        },{
                                            label: '댓글 삭제',
                                            onClick:()=>deleteReviewHandler(item.movieId, item.reviewId)
                                        }
                                    ]}
                                />
                            </Box>
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                </Box>
            })
        }
        </List>
    );
}
