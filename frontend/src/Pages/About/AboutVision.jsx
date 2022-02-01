import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import styles from './About.module.css';

export default function AboutVision() {
  return (
    <Card sx={{ width: 400 , height: 250, background: '#6C698D95', boxShadow: '4px 4px 10px rgba(0, 0, 0, 1)'}} className={styles.vision}>
      <CardContent>
        <Typography sx={{ color: '#FFFFFF',fontWeight: 700, fontSize:'30px', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center", textShadow: '1px 3px 0 #969696, 1px 13px 5px #aba8a8' }} variant="h5" component="div">
        Vision
        </Typography>
        <Typography sx={{ color: "#FFFFFF", marginTop: 3, fontSize:'20px', fontFamily: 'Tahoma'}} variant="body2">
        Crear conciencia sobre la delicada situación alimentaria mundial y ser
        fuente de inspiración para dirigirnos a un futuro sustentable.
        
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}