import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import estilos from './Steps.module.css';

const steps = [
  'COMPLETA EL FORMULARIO',
  'NOS COMUNICAMOS CONTIGO',
  'NOSOTROS RECOGEMOS O CANALIZAMOS EL DONATIVO',
];

export default function Steps() {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          marginTop: 5,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', marginTop: 1, fontStyle: 'bold' }}
        >
          ¿TE GUSTARIA CONTRIBUIR?
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', marginTop: -1, fontStyle: 'bold' }}
        >
          PROGRAMA DE DONACIONES
        </Typography>
        <div className={estilos.texto2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: 'normal',
              color: 'white',
              width: '90%',
              fontStyle: 'bold',
              marginTop: 2,
            }}
          >
            Si eres comerciante y estás en Argentina, puedes programar una
            recolección de excedentes de alimentos para ayudarnos en la lucha
            contra el hambre, nosotros hacemos la recolección.
          </Typography>
        </div>
      </Box>
      <div className={estilos.contenedor}>
        <Box
          sx={{
            width: '100%',
            colorText: '#7ED957',
            marginTop: '1.5em',
          }}
        >
          {' '}
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: 1 }}
          >
            <Stepper activeStep={3} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
