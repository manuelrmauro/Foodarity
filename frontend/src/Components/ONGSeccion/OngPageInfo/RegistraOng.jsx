import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import estilos from './RegistraOng.module.css';
import Ayuda from '../../ProfileUserComponent/Ayuda';

export default function RegistraOng({ nombre }) {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          marginTop: 10,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{
            color: '#7ED957',
            marginTop: 5,
            fontStyle: 'bold',
            textAlign: 'center',
          }}
        >
          ¿QUIERES UNIRTE COMO ONG?
        </Typography>
        <div className={estilos.texto2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: 'white',
              width: '100%',
              fontStyle: 'bold',
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Si eres una ONG como{' '}
            <span style={{ color: '#7ED957' }}>{nombre.name}</span>, puedes
            registrate{' '}
            <Link
              to="/rollSelector/register_form_ong"
              style={{ color: '#7ED957' }}
            >
              AQUI
            </Link>{' '}
            o comunicarte directamente con nuestro Centro de Atención para mayor
            información.
          </Typography>
          <Ayuda />
        </div>
      </Box>
    </div>
  );
}
