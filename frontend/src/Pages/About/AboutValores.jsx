import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import styles from './About.module.css';



export default function AboutValores() {
  return (
    <Card sx={{ minwidth: 275, background: '#7ED95790',boxShadow: '4px 4px 10px rgba(0, 0, 0, 1)'}}className={styles.containerCardValores}>
      <CardContent>
        <Typography sx={{ color: '#304543', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center",  fontWeight: 700, fontSize:'35px',textShadow: '1px 2px 0 #969696, 1px 8px 5px #aba8a8'}} variant="h5" component="div">
        Valores
        </Typography>
        <Typography sx={{ color: '#304543', fontFamily: 'Tahoma', fontSize: '20px'}} variant="body2" component="div">
        <br />
        <br />
            <StarIcon/>     <b>Diversidad e Inclusión:</b> Somos un espacio al que todos podemos
            pertenecer, unidos por el objetivo de evitar el innecesario
            desperdicio de alimentos y crear conciencia.
            <br />
            <br />
            <StarIcon/>     <b>Responsabilidad Social:</b> Nuestra comunidad es sumamente
            importante, por eso damos prioridades a las ONG para obtener
            beneficios y ayudar a los más necesitados.
            
            <br />
            <br />
            <StarIcon/>    <b>Integridad:</b> Trabajamos de manera íntegra y transparente, con
            una fuerte ética profesional y social.
            <br />
            <br />
            <StarIcon/>        <b>Impacto:</b> Creemos firmemente que nuestro trabajo impactará de
            manera positiva la conciencia del colectivo, logrando una reducción
            importante en el desperdicio de alimentos y generación de
            desperdicios.
            <br />
            <br />
            <StarIcon/>     <b>Economía:</b> Ayudamos a los comercios, y especialmente al
            pequeño empresario, a convertir posibles pérdidas en ganancias.
            <br />
            <br />
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}