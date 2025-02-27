import React, { useState, useEffect, useContext } from 'react';
import {Card, Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import AgeLogo from './ageLogo.js';
import wideMovieCard from '../styles/components/wideMovieCard.css';
import { AppContext } from "../App.js";

export default function WideMovieCard({movie, content1, content2, imgUrl, styles}) {
  const {context, setContext} = useContext(AppContext);
  const id = movie.movieId;
  const cardId = `wideReviewActionBox${id}`;

  const actionBoxController = (isHover)=>{
    document.querySelector(`#${cardId}`).style.display = isHover ? 'block' : 'none';
  }
  const moveMovieDetail = ()=>{
    window.location.href = `/detail/${id}`;
  }

  return (
    <Box style={Object.assign({position:'relative'},styles.card)} 
          onMouseOver={()=>actionBoxController(true)} 
          onMouseOut={()=>actionBoxController(false)}>
      <Box id={cardId} className='actionBox'>
        <Button onClick={moveMovieDetail}>상세 정보</Button>
      </Box>
      <Box className='wideReviewCard'>
        <Box 
        className='img mr-20'
        style={{borderRadius: 6}}>
          <img src={imgUrl}/>
        </Box>
        <Box>
            <p>{movie.title}</p>
            {content1 && content1}
            {content2 && content2}
        </Box>
      </Box>
    </Box>
  );
}
