/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Typography from '@mui/material/Typography';
import { apiWithToken } from '../../services/api'

import styles from './MpTest.module.css'
import logoMercadoPago from '../../assets/mercado_pago_png.png'

function MpTest() {
  const handleOnClick = () => {
    apiWithToken.get(`/mercadopago/register`).then(res => {
      console.log(res.data)
      window.location.href = res.data
    })
  }
  
  return (
    <div className={styles.container}>
     <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', marginBottom: 3 }}
        >
          Registrar Comercio
        </Typography>
     <button  type='button' onClick={handleOnClick} className={styles.buttonImg}>
      <img src={logoMercadoPago} alt='logo Mercado Pago' className={styles.img} />
      </button>
    </div>
  )
}

export default MpTest
