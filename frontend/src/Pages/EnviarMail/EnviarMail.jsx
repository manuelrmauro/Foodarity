/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
 import React, { useState } from "react";
 import { useDispatch } from "react-redux";
 import Swal from 'sweetalert2';
 import { enviarMail } from "../../redux/actions/userActions";

export default function RecuperarPassword() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
      email: ''
  });

  const handleOnChange = (e) => {
      e.preventDefault();
      setInput({
          ...input,
          [e.target.name] : e.target.value
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(enviarMail(input))
    Swal.fire({
      icon: 'success',
      title: 'Bien!',
      text: 'Por favor revise su email',
    });
  }

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
      <h1>Recuperacion de contraseña</h1>
      <p>Por favor para poder recuperar su contraseña introduzca su email</p>
      <form onSubmit={handleSubmit}> 
        <div>
          <input
            type="text"
            value={input.email}
            required
            name="email"
            placeholder="Ingrese su email"
            onChange={(e) => {
                handleOnChange(e);
                validateEmail(e);
              }}
          />
          <p>{errors.email}</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
