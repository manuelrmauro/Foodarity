import * as React from 'react';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import styles from './About.module.css';



export default function AboutCard() {

  

  return (
    
    <Card sx={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 1)'}} className={styles.containerCardAbout} >
      <CardContent>
        <Typography sx={{ marginTop: 2, color: "#3E2463", background: 'white', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 700, fontSize:'35px', textShadow: '1px 3px 0 #969696, 1px 7px 5px #aba8a8',}} variant="h5" component="div">
        Acerca de Nosotros
        </Typography>
        <Typography sx={{ color: "#533C74" , marginTop: 5, display: "flex", justifyContent: "center",alignItems: "center", fontFamily: 'Tahoma', fontSize:'20px'}} variant="body2">
        <p><big><b>Foodarity</b></big> es una app que te permite ubicar de manera sumamente simple
        ofertas de alimentos en buen estado, pero que están cerca de llegar a su
        tiempo de vida media, lo cual representa un problema muy grande: <u> desperdicio de alimentos.</u>
        <br/>
        <br/>
        <br/>
        <big><b>Foodarity</b></big>, más que una app, es una comunidad
        donde comercios pueden publicar ofertas de alimento que necesitan ser
        vendidos rápidamente a usuarios comunes que puedan aprovecharlas, a su
        vez, damos especial atención a las ONG, que a través de donaciones
        especiales pueden obtener estos alimentos y aprovecharlos en obras
        benéficas. 
        
        <br/>
        <br/>
        <br/>
        Nuestro nombre nace de <b>Food</b> <i>(comida)</i> y <b>Solidarity</b>
        <i>(solidaridad)</i>, dado a nuestro principal objetivo de luchar contra el desperdicio de
        alimentos, disminuir la generación de desperdicios y brindar ayuda a los
        sectores de la comunidad que más lo necesiten.</p>
          <br />
        </Typography>
      </CardContent>
    </Card>
  
  );
}