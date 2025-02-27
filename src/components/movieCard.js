import React, { useState, useEffect } from 'react';
import {Card, Box, Button} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MovieCard({id, text, imgUrl, styles}) {

  const cardId = `actionBox${id}`;
  const actionBoxStyle = {
      display: 'none',
      position:'absolute',
      left:0, top:0,
      zIndex:9999,
      background: '#fff',
      opacity: '0.7',
      height: '100%',
      textAlign: 'center',
      placeContent: 'center'
  }
  const actionBoxController = (isHover)=>{
    document.querySelector(`#${cardId}`).style.display = isHover ? 'block' : 'none';
  }
  const moveMovieDetail = ()=>{
    window.location.href = `/detail/${id}`;
  }

  return (
    <Card sx={styles.card} 
          style={{position:'relative'}} 
          onMouseOver={()=>actionBoxController(true)} 
          onMouseOut={()=>actionBoxController(false)}>
      <Box id={cardId} className='actionBox' style={actionBoxStyle}>
        <Button onClick={()=>{window.location.href=`/booking/${id}`}}>예매</Button>
        <Button onClick={moveMovieDetail}>상세 정보</Button>
      </Box>
      <CardActionArea>
        <CardMedia
          component="img"
          height={styles.img.height}
          src={imgUrl}
        />
        <CardContent>
          <Typography sx={{ 
              color: 'text.secondary', 
              textWrapMode: 'nowrap',
              overflow: 'hidden' }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
