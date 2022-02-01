import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styles from './UserDetail.module.css';
import RegisterUserFormEditable from './RegisterUserFormEditable';

export default function UserDetail({ detail }) {
  const [displayDetail] = useState(true);
  const { name, email, phone } = detail;

  return (
    <div className={styles.parent}>
      {displayDetail ? (
        <div>
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: 4 }}
            >
              Información de Perfil
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '2em' }}
            >
              Nombre:
              <span style={{ color: '#8865b9' }}>
                {' '}
                {name || 'Usuario no registrado'}{' '}
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Email Registrado:
              <span style={{ color: '#8865b9' }}>
                {' '}
                {email || 'No registrado aún'}{' '}
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Teléfono de Contacto:
              <span style={{ color: '#8865b9' }}>
                {phone || ' No registrado aún'}{' '}
              </span>
            </Typography>
          </div>
          {/* <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Método de Pago:
              <span style={{ color: '#8865b9' }}> No registrado aún</span>
            </Typography>
          </div> */}

          <RegisterUserFormEditable detail={detail} />
        </div>
      ) : (
        <RegisterUserFormEditable detail={detail} />
      )}
    </div>
  );
}
