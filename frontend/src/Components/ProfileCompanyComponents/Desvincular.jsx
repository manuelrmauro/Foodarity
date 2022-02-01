import React from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import { apiWithToken } from '../../services/api';
import styles from './Desvincular.module.css';
// import logoMercadoPago from '../../assets/mercado_pago_png.png'

function Desvincular() {
  const handleOnClick = () => {
    Swal.fire({
      title: '¿Estás seguro de querer desvincular tu cuenta ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        apiWithToken
          .delete(`/mercadopago/unlink`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: 'success',
              title: 'Bien',
              text: 'Te desvinculaste con exito.',
            }).then(() => {
              window.location.href = '/profilecompany';
            });
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Algo fallo. Vuelva a intentar.',
            });
          });
      }
    });
  };

  return (
    <div className={styles.container}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ color: '#7ED957', marginBottom: 3, marginTop: 10 }}
      >
        Vinculado con Mercado de PAGO
      </Typography>

      <Button
        onClick={handleOnClick}
        type="button"
        sx={{
          backgroundColor: '#7ED957',
          '&:hover': { backgroundColor: '#7ED95790 !important' },
          marginTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        DESVINCULAR
      </Button>
      {/* <img src={logoMercadoPago} alt='logo Mercado Pago' className={styles.img} /> */}
    </div>
  );
}

export default Desvincular;
