// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

import { apiWithToken } from '../../services/api';
import styles from './CompanyDetail.module.css';

function Delete({ company }) {
  function handleDelete() {
    // eslint-disable-next-line no-alert

    Swal.fire({
      title: '¿Estás seguro de querer Eliminar la cuenta ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        apiWithToken.delete(`/companies/disabled/${company.id}`).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Bien!',
            text: "Compania eliminada con exito.",
            buttons: ['ok']
          }).then(() => {
            window.location.href = '/home';
          })
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: "Hubo un error, intente nuevamente.",
          });
        })
      }
    });

    // if (window.confirm('Queres eliminar esta compania?')) {
    //   apiWithToken.delete(`/companies/disabled/${company.id}`);
    //   window.location.reload();
    // }
  }

  return (
    <div className={styles.companydetail}>
      <div className={styles.texto}>
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
              Eliminar la Cuenta
            </Typography>
          </div>
          <br />
          <div>
            <Typography
              variant="body"
              gutterBottom
              sx={{ align: 'justify', color: '#8865b9', marginTop: 7 }}
            >
              Lamentamos que quieras
              <span style={{ color: '#e63946' }}> eliminar </span> tu cuenta.
            </Typography>
            <br />
            <br />
            <Typography
              variant="body"
              gutterBottom
              sx={{ align: 'justify', color: '#8865b9' }}
            >
              Si te preocupa los cambios de nuestras Condiciones de Servicio,
              puedes ponerte en contacto con alguno de nuestros asesores en
              cualquiera de nuestros centros de atención, y con mucho gusto te
              atenderemos.
              <br />
              <br />
              Si estás seguro de eliminar tu cuenta, te recordamos que dispones
              de 15 días posteriores de la eliminación para recuperar tus datos,
              por lo que finalizando ese periodo, tus datos de cuenta quedarán
              completamente eliminados.
            </Typography>
          </div>
        </Box>
      </div>
      <div className={styles.btncont}>
        <Button
          sx={{
            backgroundColor: '#e63946',
            '&:hover': { backgroundColor: '#e6394690 !important' },
            marginTop: 5,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          onClick={() => {
            handleDelete();
          }}
        >
          ELIMINAR CUENTA
        </Button>
      </div>
    </div>
  );
}

export default Delete;
