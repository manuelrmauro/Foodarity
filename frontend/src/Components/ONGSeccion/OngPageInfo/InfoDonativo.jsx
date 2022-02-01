import React from 'react';
import {useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import estilos from './InfoDonativo.module.css';

const steps = [
  'COMPLETA EL FORMULARIO',
  'NOS COMUNICAMOS CONTIGO',
  'NOSOTROS RECOGEMOS O CANALIZAMOS EL DONATIVO',
];

export default function InfoDonativo({nombre}) {
  const {id} = useSelector(state => state.auth)
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          marginTop: 1,
        }}
      >
        <div>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: 1 }}
          >
            ¿QUÉ ES EL PROGRAMA DE DONACIONES?
          </Typography>
        </div>
        <br />
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'justify', color: 'white', marginTop: 1 }}
          >
            Nuestro programa surge como respuesta a una necesidad de la sociedad
            que no estaba siendo atendida, la de reducir el desperdicio de
            alimentos y fomentar condiciones de seguridad alimentaria en
            comunidades especialmente vulnerables.
          </Typography>
          <br />
          <br />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'justify', color: 'white', marginTop: 0 }}
          >
            Es por ello, que recaudamos alimentos donados por comercios, para
            que podamos entregarlos a ONGs como{' '}
            <span style={{ color: '#7ED957' }}>{nombre.name}</span>, que buscan
            aliviar el hambre y la inseguridad alimentaria en nuestras
            comunidades.
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: 6 }}
          >
            ¿CÓMO PUEDES AYUDAR?
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: 'normal',
              color: 'white',
              width: '90%',
              fontStyle: 'bold',
              marginTop: 3,
            }}
          >
            Si eres comerciante y estás en Argentina, puedes programar una
            recolección de excedentes de alimentos, nosotros hacemos la
            recolección.
          </Typography>
          {id ? <Typography
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
            Debes registrar tu comercio en el siguiente enlace:
            <form method="get" action="/rollSelector/registerformcommerce">
              <Button
                type="submit"
                sx={{
                  backgroundColor: '#7ED957',
                  '&:hover': { backgroundColor: '#7ED95790 !important' },
                  marginTop: 3,
                }}
              >
                REGISTRAR COMERCIO
              </Button>
            </form>
          </Typography> :
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
          Debes ser un usuario registrador para registrar un comercio:
          <form method="get" action="/register">
            <Button
              type="submit"
              sx={{
                backgroundColor: '#7ED957',
                '&:hover': { backgroundColor: '#7ED95790 !important' },
                marginTop: 3,
              }}
            >
              REGISTRARSE
            </Button>
          </form>
        </Typography>}
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
            Una vez registrado tu comercio, seguir los siguientes pasos:
          </Typography>
          <div className={estilos.steps}>
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
      </Box>
    </div>
  );
}
