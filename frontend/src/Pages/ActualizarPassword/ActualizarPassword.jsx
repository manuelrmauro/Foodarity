/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { api } from '../../services/api';
import style from './ActualizarPassword.module.css';
import logo from '../../assets/WEB-Full-Header-Logo.png';

function ActualizarPassword() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isValid, setisValid] = useState(null);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    password: '',
    passwordDos: '',
  });

  const confirm = () => {
    const emailCode = searchParams.get('emailcode');
    if (params.id > 0 && emailCode !== '') {
      api.post(`users/validate/${params.id}/${emailCode}`).then((res) => {
        if (res.status === 200 || res.status === 201) {
          setisValid(emailCode);
        } else {
          setisValid(false);
          alert('Error con el codigo de validacion');
          navigate('/home');
        }
      });
    } else {
      alert('Algo salio mal');
      navigate('/');
    }
  };

  useEffect(() => {
    confirm();
  }, []);

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
      .post('/users/updatepassword', { input, emailCode: isValid })
      // eslint-disable-next-line no-alert
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: 'Tu contraseña se cambio correctamente',
        });
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        alert('Algo Salio mal');
        navigate('/');
      });
  };

  const validatePassword = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/^.{4,12}$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Debe contener entre 4 y 12 caracteres',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validatePassword2 = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (value !== input.password) {
      setErrors({
        ...errors,
        [name]: 'No coincide',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  return isValid ? (
    <div>
      <div className={style.contLogo}>
        <img className={style.logo} src={logo} alt="" />
      </div>
      <form autoComplete='off' className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.h1}>Formulario para recuperar contraseña</h1>
        <div className={style.contener}>
          <div>
            <h4>Contraseña</h4>
            <input
              type="password"
              name="password"
              required
              value={input.password}
              onChange={(e) => {
                handleOnChange(e);
                validatePassword(e);
              }}
            />
            <p className={style.errors}>{errors.password}</p>
          </div>
          <div>
            <h4>Vuelva a introducir su contraseña</h4>
            <input
              type="password"
              name="passwordDos"
              required
              value={input.passwordDos}
              onChange={(e) => {
                handleOnChange(e);
                validatePassword2(e);
              }}
            />
            <p className={style.errors}>{errors.passwordDos}</p>
          </div>
        </div>
        <div className={style.bt}>
          <br />
          <Button
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
            Restablecer Contraseña
          </Button>
        </div>
      </form>
    </div>
  ) : null;
}

export default ActualizarPassword;
