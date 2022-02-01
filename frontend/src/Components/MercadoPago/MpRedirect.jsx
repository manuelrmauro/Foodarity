/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function MpRedirect() {
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const code = params.get('code') || '';
  const state = params.get('state') || '';
  const [enabled, setenabled] = useState();
  // const navigate = useNavigate();

  // const handleRegister = () => {
  //   api.post(`/mercadopago/register?code=${code}&state=${state}`);
  // };
  const success = () => {
    Swal.fire({
      icon: 'success',
      title: 'Bien',
      text: 'Comercio registrado correctamente.'})
      navigate('/profilecompany')
  }
  const error = () => {
    Swal.fire({
      icon: 'error',
      title: 'Bien',
      text: 'Hubo un error, vuelva a intentarlo.'})
    navigate('/home')
  }

  useEffect(() => {
    if (code !== '' && state !== '') {
      apiWithToken
        .post(`/mercadopago/register?code=${code}&state=${state}`)
        .then(() => {
          setenabled(true);
        })
        .catch((err) => {
          console.log(err);
          // navigate('/', { replace: true });
        });
    } else {
      setenabled(false);
      // navigate('/', { replace: true });
    }
  }, []);

  return (
    <div>
      {enabled === true && 
        success()
      }
      {enabled === false && 
         error()
      }
    </div>
  );
}

export default MpRedirect;
