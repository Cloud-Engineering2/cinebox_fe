import React, { useState, useEffect, useReducer } from 'react';
import {Card, Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import AgeLogo from './ageLogo';
import movieCard from '../styles/components/movieCard.css'

export default function MovieCard({movie, imgUrl, styles}) {
  const id = movie.movieId;
  const title = movie.title;
  const cardId = `actionBox${id}`;

  const actionBoxController = (isHover)=>{
    document.querySelector(`#${cardId}`).style.display = isHover ? 'block' : 'none';
  }
  const moveMovieDetail = ()=>{
    window.location.href = `/detail/${id}`;
  }
  const getMovieAge = (ratingGrade)=>{
    switch (ratingGrade){
      case (null || '전체관람가') : 
        return {age: 'All', color: 'green'};
      case ('12세이상관람가') : 
        return {age: '12', color: 'yellow'};
      case ('15세이상관람가') : 
        return {age: '15', color: 'orange'};
      case ('19세이상관람가' || '청소년관람불가') : 
        return {age: '19', color: 'red'};
      default : 
        return {age: 'All', color: 'green'};
    }
  }

  return (
    <Box style={Object.assign({position:'relative'},styles.card)} 
          onMouseOver={()=>actionBoxController(true)} 
          onMouseOut={()=>actionBoxController(false)}>
      <Box id={cardId} className='actionBox'>
        <Button onClick={()=>{window.location.href=`/booking/${id}`}}>예매</Button>
        <Button onClick={moveMovieDetail}>상세 정보</Button>
      </Box>
      <Box style={{height: styles.card.height * 0.87}}>
        <Box style={{
          height: '100%',
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'contain',
          borderRadius: 6
        }}>
          {/* <img src={imgUrl}/> */}
        </Box>
        <Box>
          <Typography sx={{ 
              textAlign: 'center',
              textWrapMode: 'nowrap',
              overflow: 'hidden',
              margin: '9px 0px 5px',
              fontSize: 16 }}>
            {title}
          </Typography>
          <Box className='flex'>
            <AgeLogo 
              age={getMovieAge(movie.ratingGrade).age}
              color={getMovieAge(movie.ratingGrade).color}
            />
            <Typography sx={{ 
                color: 'text.secondary', 
                textWrapMode: 'nowrap',
                overflow: 'hidden',
                fontSize: 12 }}>
              {movie.releaseDate} 개봉
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
