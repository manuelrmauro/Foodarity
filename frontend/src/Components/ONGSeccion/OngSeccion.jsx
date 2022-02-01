// import React from 'react';
// import { Link } from 'react-router-dom';
// import { styles } from './OngSeccion.style';

// function OngSeccion({ong}) {
//   return <div>
//     <Link to={`/company/${ong.id}`}>
//    <img src={ong.logo.url} alt='' className={styles.imgOngs}/>
//     </Link>
//   </div>;
// }

// export default OngSeccion

import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';
import styles from './OngSeccion.module.css';
import avatarDefault from '../../assets/avatar_default.png';

export default function OngSeccion({ ong }) {
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: '25vh',
    maxWidth: '25vh',
    maxHeight: 200,
    margin: 8,

    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
      borderRadius: '5px 5px 5px 5px',
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.1,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
        borderRadius: '5px 5px 5px 5px',
      },
    },
    '& .MuiTypography-root': {
      border: '2px solid currentColor',
      borderRadius: '5px 5px 5px 5px',
    },
  }));

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: theme.palette.common.white,
    borderRadius: '5px 5px 5px 5px',
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create('opacity'),
    borderRadius: '5px 5px 5px 5px',
  }));

  // const ImageMarked = styled('span')(({ theme }) => ({
  //   height: 3,
  //   width: 18,
  //   position: 'absolute',
  //   bottom: -2,
  //   left: 'calc(50% - 9px)',
  //   transition: theme.transitions.create('opacity'),
  // }));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        minWidth: 200,
        width: '100%',
        padding: '1vh',
      }}
    >
      <Link to={`/company/${ong.id}`}>
        <ImageButton
          focusRipple
          key={ong.id}
          sx={{ width: '100%', backgroundColor: 'white' }}
        >
          <img
            src={ong.logo ? ong.logo.url : avatarDefault}
            alt=""
            className={styles.imgOngs}
          />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            {/* <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                backgroundColor: '#7ED95740',
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                borderRadius: '5px',
              }}
            >
              {ong.name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography> */}
          </Image>
        </ImageButton>
      </Link>
    </Box>
  );
}
