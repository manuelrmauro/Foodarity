/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import Swal from 'sweetalert2'
import { useParams, useNavigate,useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';

function ConfirmarEmail() {
  const params = useParams();
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  
  const confirm =() => {
    const emailCode = searchParams.get('emailcode');
    console.log(emailCode);
    console.log(params.id);
    if (params.id > 0 && emailCode !== '') {
      api.post(`users/validate/${params.id}/${emailCode}`).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: 'Email confirmado, ya puedes ingresar.'})
          navigate('/login')
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: 'El email ya estaba confirmado, ya puedes ingresas.'})
          navigate('/login')
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Codigo erroneo.'})
      navigate('/')
    }
  }

  useEffect(() => {
    confirm()
  },[])

    
  return <div>{}</div>;
}

export default ConfirmarEmail;
