import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import '../styles/components/movieCard.css';
import AgeLogo from './ageLogo';

export default function MovieCard({ number, movie, imgUrl, styles }) {
  const id = movie.movieId;
  const title = movie.title;
  const cardId = `actionBox${id}`;

  const actionBoxController = useCallback((isHover) => {
    document.querySelector(`#${cardId}`).style.display = isHover ? 'block' : 'none';
  }, [cardId])
  const getMovieAge = useCallback((ratingGrade) => {
    switch (ratingGrade) {
      case (null || '전체관람가'):
        return { age: 'All', color: 'green' };
      case ('12세이상관람가'):
        return { age: '12', color: 'yellow' };
      case ('15세이상관람가'):
        return { age: '15', color: 'orange' };
      case ('청소년관람불가'):
        return { age: '19', color: 'red' };
      default:
        return { age: 'All', color: 'green' };
    }
  }, [])

  return (
    <Box style={Object.assign({ position: 'relative' }, styles.card)}
      onMouseOver={() => actionBoxController(true)}
      onMouseOut={() => actionBoxController(false)}>
      <Box id={cardId} className='actionBox'>
        <Button onClick={() => { window.location.href = `/booking/${id}` }}>예매</Button>
        <Button onClick={() => { window.location.href = `/detail/${id}` }}>상세 정보</Button>
      </Box>
      <Box style={{ height: styles.card.height * 0.87 }}>
        <Box style={{
          height: '100%',
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'contain',
          borderRadius: 6
        }}>
          {/* <img src={imgUrl}/> */}
        </Box>
        <Box>
          <Box className='flex'>
            {number && <em className='number mr-7 min-width-20'>{number}</em>}
            <Typography
              sx={{
                width: (number ? '62%' : '100%'),
                textAlign: 'center',
                textWrapMode: 'nowrap',
                overflow: 'hidden',
                margin: '9px 0px 5px',
                fontSize: 16
              }}>
              {title}
            </Typography>
          </Box>
          <Box className='flex'>
            <AgeLogo
              age={getMovieAge(movie.ratingGrade).age}
              color={getMovieAge(movie.ratingGrade).color}
            />
            <Typography sx={{
              color: 'text.secondary',
              textWrapMode: 'nowrap',
              overflow: 'hidden',
              fontSize: 12
            }}>
              {movie.releaseDate} 개봉
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
