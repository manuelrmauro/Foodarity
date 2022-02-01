/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
// import Header from '../../Components/Header/Header';
import style from './RegisterFormUser.module.css';
import logo from '../../assets/WEB-Full-Header-Logo.png';
import { api } from '../../services/api';

import {
  startCheking,
  startGoogleLogin,
} from '../../redux/actions/authActions';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    validatePassword: '',
  });

  window.scroll(0, 0);

  const validateLetters = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[a-zA-Z ]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Solo letras',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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
        [name]: 'No es un email valido!',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.validatePassword
    ) {
      api
        .post('/users', input)
        .then((res) => {
          const { id } = res.data;
          const { email } = input;
          api.post('users/validate', { id, email });
          dispatch(startCheking());
          Swal.fire({
            icon: 'success',
            title: 'Bien!',
            text: 'Te registraste con exito. Revisa tu casilla de correos para validar tu cuenta.',
          });
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El email ya esta en uso.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Disculpe, estamos teniendo problemas con el servidor. Intente nuevamente mas tarde.',
            });
          }
        });
      setInput({
        name: '',
        email: '',
        password: '',
        validatePassword: '',
      });
    } else {
      // eslint-disable-next-line no-alert
      Swal.fire({
        icon: 'error',
        title: 'Oppss!',
        text: 'Por favor ingrese los datos correctamente',
      });
    }
  };

  const responseGoogleSucces = ({ tokenId }) => {
    dispatch(startGoogleLogin(tokenId));
  };
  const responseGoogleFail = () => {
    navigate('/register', { replace: true });
  };

  const [isAllow, setIsAllow] = React.useState(false);

  useEffect(() => {
    if (
      Object.values(errors).filter((e) => e !== '').length === 0 &&
      Object.values(input).filter((e) => e === '').length === 0
    )
      setIsAllow(true);
    else setIsAllow(false);
  }, [errors, input]);

  return (
    <div className={style.register}>
      <div className={style.contLogo}>
        <Link to="/">
          <img className={style.logo} src={logo} alt="" />
        </Link>
      </div>
      <form autoComplete='off' className={style.form} onSubmit={handleSubmit}>
        <div className={style.divInputs}>
          <div className={style.title}>
            <label>Ingrese Su Nombre</label>
          </div>
          <input
            className={style.inputs}
            type="text"
            name="name"
            value={input.name}
            placeholder="Ingrese su nombre"
            onChange={(e) => {
              handleOnChange(e);
              validateLetters(e);
            }}
          />
          <div className={style.divErrorNombre}>
            <p className={style.errors}>{errors.name}</p>
          </div>
          <label className={style.title}>Ingrese Su Email</label>
          <input
            className={style.inputs}
            type="text"
            name="email"
            value={input.email}
            placeholder="Ingrese su email"
            onChange={(e) => {
              handleOnChange(e);
              validateEmail(e);
            }}
          />
          <div className={style.divErrorEmail}>
            <p className={style.errors}>{errors.email}</p>
          </div>
          <label className={style.title}>Ingrese Su Contraseña</label>
          <input
            className={style.inputs}
            type="password"
            name="password"
            value={input.password}
            placeholder="Ingrese su contraseña"
            onChange={(e) => {
              handleOnChange(e);
              validatePassword(e);
            }}
          />
          <div className={style.divErrorPassword}>
            <p className={style.errors}>{errors.password}</p>
          </div>
          <label className={style.title}>Repita Su Contraseña</label>
          <input
            className={style.inputs}
            type="password"
            name="validatePassword"
            value={input.validatePassword}
            placeholder="Vuelva a escribir su contraseña"
            onChange={(e) => {
              handleOnChange(e);
              validatePassword2(e);
            }}
          />
          <div className={style.divErrorPassword2}>
            <p className={style.errors}>{errors.validatePassword}</p>
          </div>
        </div>
        <div className={style.buttonsDiv}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: '1em',
              backgroundColor: '#7ED957',
                '&:hover': { backgroundColor: '#7ED95790 !important' },
                height: '2.5em',
                color: '#3e2463',
                fontStyle: 'bold',
            }}
            onClick={(e) => handleSubmit(e)}
            disabled={!isAllow}
          >
            Crear Cuenta
          </Button>

          <GoogleLogin
            clientId="327655390134-3dkok4tsgubva7v5gj7drncddv260lor.apps.googleusercontent.com"
            buttonText="Continuar con Google"
            onSuccess={responseGoogleSucces}
            onFailure={responseGoogleFail}
            cookiePolicy="single_host_origin"
            style={{ width: '100%' }}
          />
          <p>
            {' '}
            Ya tiene una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
