import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import bolsa1 from '../../assets/imgportal1.png';
import styles from './PortalCompania.module.css';
import Ayuda from '../ProfileUserComponent/Ayuda';

export default function PortalCompania({ company }) {
  const { name } = company;

  return (
    <div className={styles.bodyParent}>
      <div className={styles.parent}>
        <div className={styles.texto2}>
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
                  align: 'justify',
                  color: '#8865b9',
                  marginTop: 7,
                  fontSize: 20,
                }}
              >
                Te damos la Bienvenida a tu
                <span style={{ color: '#7ED957' }}> Portal de Compania</span>,
                aquí puedes ver tu información de cuenta, actualizar tus datos
                generales, revisar el historial de tus ventas, donaciones
                realizadas, agregar usuarios, publicar nuevos productos.
              </Typography>
              <br />
              <br />
              <Typography
                variant="body"
                gutterBottom
                sx={{ align: 'justify', color: '#8865b9', fontSize: 20 }}
              >
                En caso de requerir ayuda, tener dudas o sugerencias a nuestro
                servicio, puedes ver nuestra información de contacto en el botón
                de abajo.
              </Typography>
            </div>
            <div className={styles.ayuda}>
              <Ayuda />
            </div>
          </Box>
        </div>
        <div className={styles.imagen}>
          <ImageListItem sx={{ width: 380, height: 300, marginTop: 1 }}>
            <img
              className={styles.imagen}
              src={bolsa1}
              alt="phot"
              loading="lazy"
            />
          </ImageListItem>
        </div>
      </div>
    </div>
  );
}
