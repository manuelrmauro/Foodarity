/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { api } from '../../services/api';
import style from './RecuperarPassword.module.css';
import logo from '../../assets/WEB-Full-Header-Logo.png';

export default function RecuperarPassword() {
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: '',
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('/users/reset', input)
      // eslint-disable-next-line no-alert
      // .then((response)=>alert('Se envio el correo'))
      // .catch((error)=>console.log(error))
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'El correo se envio correctamente',
          text: 'por favor revisa tu Mail',
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'errors',
          title: 'oppss',
          text: 'Algo salio mal',
        });
      });
  };

  const validateEmail = (e) => {
    const { name, value } = e.target;
    const expresion =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setInput({
      ...input,
      [name]: value,
    });
    if (!expresion.test(value)) {
      setErrors({
        ...errors,
        [name]: 'No es un email válido!',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  return (
    <div>
      <div className={style.contLogo}>
        <img className={style.logo} src={logo} alt="" />
      </div>
      <form autoComplete='off' className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.h3}>Formulario para recuperar contraseña</h1>
        <div className={style.contener}>
          <h4>Email</h4>
          <input
            type="text"
            name="email"
            required
            value={input.email}
            onChange={(e) => {
              handleOnChange(e);
              validateEmail(e);
            }}
          />
          <p className={style.errors}>{errors.email}</p>
        </div>
        <div className={style.btn}>
          <br />
          <Button
            className={style.bt}
            variant="contained"
            sx={{
              backgroundColor: '#FDFFB6',
              height: '2.5em',
              color: '#3e2463',
              fontStyle: 'bold',
              margin: '3em 2em 2em',
            }}
            onClick={(e) => handleSubmit(e)}
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
