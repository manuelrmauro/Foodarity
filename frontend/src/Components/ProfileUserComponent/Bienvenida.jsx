import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import bolsa1 from '../../assets/bolsa1.png';
import estilos from './Bienvenida.module.css';
import Ayuda from './Ayuda';

export default function UserDetail({ detail }) {
  const { name } = detail;

  return (
    <div className={estilos.parent}>
      <div className={estilos.texto}>
        <Box
          sx={{
            width: 300,
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
              Hola {name}!
            </Typography>
          </div>
          <br />
          <div>
            <Typography
              variant="body"
              gutterBottom
              sx={{ textAlign: 'justify', color: '#8865b9', marginTop: 7 }}
            >
              Te damos la Bienvenida a tu
              <span style={{ color: '#7ED957' }}> Portal de Usuario</span>, aquí
              puedes ver tu información de cuenta, actualizar tus datos
              generales o revisar el historial de tus compras anteriores.
            </Typography>
            <br />
            <br />
            <Typography
              variant="body"
              gutterBottom
              sx={{ textAlign: 'justify', color: '#8865b9' }}
            >
              En caso de requerir ayuda, tener dudas o sugerencias a nuestro
              servicio, puedes ver nuestra información de contacto en el botón
              de abajo.
            </Typography>
          </div>
          <Ayuda />
        </Box>
      </div>
      <div className={estilos.texto2}>
        <Box
          sx={{
            width: 500,
            // maxWidth: 100,
            marginTop: 1,
          }}
        >
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: 3 }}
            >
              Hola {name}!
            </Typography>
          </div>
          <br />
          <div>
            <Typography
              variant="body"
              gutterBottom
              sx={{
                textAlign: 'justify',
                color: '#8865b9',
                marginTop: 7,
                fontSize: 20,
              }}
            >
              Te damos la Bienvenida a tu
              <span style={{ color: '#7ED957' }}> Portal de Usuario</span>, aquí
              puedes ver tu información de cuenta, actualizar tus datos
              generales o revisar el historial de tus compras anteriores.
            </Typography>
            <br />
            <br />
            <Typography
              variant="body"
              gutterBottom
              sx={{ textAlign: 'justify', color: '#8865b9', fontSize: 20 }}
            >
              En caso de requerir ayuda, tener dudas o sugerencias a nuestro
              servicio, puedes ver nuestra información de contacto en el botón
              de abajo.
            </Typography>
          </div>
          <div className={estilos.ayuda}>
            <Ayuda />
          </div>
        </Box>
      </div>
      <div className={estilos.imagen}>
        <ImageListItem sx={{ width: 680, height: 600, marginTop: 2 }}>
          <img src={bolsa1} alt="phot" loading="lazy" />
        </ImageListItem>
      </div>
    </div>
  );
}
