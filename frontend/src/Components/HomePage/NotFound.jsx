import React from 'react';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import styles from './NotFound.module.css';
import img from '../../assets/404.png';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.ups}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ color: '#e25656', marginTop: 1 }}
        >
          UPS!
        </Typography>
      </div>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ color: '#3E246390', marginTop: 1 }}
      >
        No se han encontrados productos con esas caracteristicas. Vuelva a
        Intentarlo.
      </Typography>
      <ImageListItem sx={{ width: 250, height: 200, marginTop: 0 }}>
        <img src={img} alt="phot" loading="lazy" />
      </ImageListItem>
    </div>
  );
}

export default NotFound;
