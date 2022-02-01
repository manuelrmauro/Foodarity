/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import styles from './RegisterCompanyFormEditable.module.css';
import CommerceLogo from '../../assets/Mask-Group.png';
import { api, apiWithToken } from '../../services/api';

// import AlertOng from '../Alertas/AlertEnviarSolicitud';

let time = null;
let time2 = null;

export default function RegisterCompanyFormEditable({ company, handleBack }) {
  const [provincia, setprovincia] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [termProvincia, setTermProvincia] = useState(
    company.address.state.name
  );
  const [termCiudad, setTermCiudad] = useState(company.address.state.name);
  const [errors, setErrors] = useState({});
  const initialFormValues = {
    stateId: company.address.state.id,
    cityId: company.address.city.id,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  // const navigate = useNavigate();
  const [input, setInput] = useState({
    name: company.name,
    website: company.website,
    email: company.email,
    description: company.description,
    areaCode: company.areaCode,
    phone: company.phone,
    street: company.address.street,
    number: company.address.number,
    zipcode: company.address.zipcode,
  });

  const [photo, setPhoto] = useState({
    url: company.logo ? company.logo.url : '',
  });

  const searchProvincia = (term) => {
    api.get(`/states?name=${term}`).then((response) => {
      setprovincia(response.data);
    });
  };

  const searchCiudad = (term) => {
    api.get(`/cities/${formValues.stateId}/?name=${term}`).then((response) => {
      setCiudad(response.data);
    });
  };

  useEffect(() => {
    clearTimeout(time);
    if (termProvincia.trim() !== '' && formValues.stateId === null) {
      time = setTimeout(() => {
        searchProvincia(termProvincia);
      }, 1000);
    }
    return () => {
      setprovincia([]);
    };
  }, [termProvincia]);

  useEffect(() => {
    clearTimeout(time2);
    if (
      termCiudad.trim() !== '' &&
      formValues.cityId === null &&
      formValues.stateId !== null
    ) {
      time2 = setTimeout(() => {
        searchCiudad(termCiudad);
      }, 1000);
    }
    return () => {
      setCiudad([]);
    };
  }, [termCiudad]);

  const handleProvincia = (event) => {
    setFormValues({
      ...formValues,
      stateId: event.target.attributes.provid.value,
    });
    setTermProvincia(event.target.attributes.provname.value);
  };

  const handleCiudad = (event) => {
    setFormValues({
      ...formValues,
      cityId: event.target.attributes.cityid.value,
    });
    setTermCiudad(event.target.attributes.cityname.value);
  };

  const handleInputProvincia = ({ target }) => {
    setFormValues({
      ...formValues,
      stateId: null,
      cityId: null,
    });
    setTermCiudad('');
    setTermProvincia(target.value);
  };

  const handleInputCiudad = ({ target }) => {
    setFormValues({
      ...formValues,
      cityId: null,
    });
    setTermCiudad(target.value);
  };

  // const handlePhoto = async (e) => {
  //   try {
  //     const form = new FormData();
  //     form.append('file', e.target.files[0]);
  //     console.log(e.target.files)
  //     await apiWithToken.patch(`/companies/${company.id}/upload/logo`, form)
  //     .then(res => {
  //       setPhoto(res.data.logo)
  //       console.log(photo)
  //     return res})
  //     .then(res => {
  //       if (res.status === 200) {
  //         // eslint-disable-next-line no-alert
  //         alert('Logo actualizado con exito')
  //       }
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

  const validateUrl = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (value !== '' && !/^(www)[^ "]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'La URL no es valida! - Debe contener wwww',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateNum = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    // eslint-disable-next-line no-useless-escape
    if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Solo numeros',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // const validateAreacode = (e) => {
  //   const { name, value } = e.target;
  //   setInput({
  //     ...input,
  //     [name]: value,
  //   });
  //   // eslint-disable-next-line no-useless-escape
  //   if (!/^\D*\d{2}$/.test(value)) {
  //     setErrors({
  //       ...errors,
  //       [name]: 'Solo numeros',
  //     });
  //   } else {
  //     setErrors({
  //       ...errors,
  //       [name]: '',
  //     });
  //   }
  // };

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
      !errors.website &&
      !errors.description &&
      !errors.areaCode &&
      !errors.phone &&
      !errors.street &&
      !errors.number &&
      !errors.zipcode
    ) {
      apiWithToken
        .put(`/companies/${company.id}`, { ...input, ...formValues })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Bien!',
            text: 'Datos actualizados.',
            buttons: ['ok'],
          }).then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Hubo un error, intente nuevamente.',
          });
        });
    } else {
      // eslint-disable-next-line no-alert
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Complete el formulario.',
      });
    }
  };

  const handleChangeImage = async ({ target }) => {
    const image = target.files[0];

    const preview = document.querySelector('#commerceImage img');

    if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
      document.querySelector('#datosImagen').value = '';

      Swal.fire({
        icon: 'error',
        title: 'Error al subir la imagen',
        text: '¡La imagen debe estar en formato JPG o PNG!',
      });
    } else if (Number(image.size) > 2000000) {
      document.querySelector('#datosImagen').value = '';

      Swal.fire({
        icon: 'error',
        title: 'Error al subir la imagen',
        text: '¡La imagen no debe pesar más de 2 MB!',
      });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        preview.src = reader.result;
      };

      reader.readAsDataURL(image);

      try {
        const form = new FormData();
        form.append('file', target.files[0]);
        console.log(target.files);
        await apiWithToken
          .patch(`/companies/${company.id}/upload/logo`, form)
          .then((res) => {
            setPhoto(res.data.logo);
            console.log(photo);
            return res;
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Bien!',
                text: 'Logo actualizado con exito.',
              });
            }
          });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Hubo un error con la imagen, intente nuevamente.',
        });
      }
    }
  };

  return (
    <div className={styles.RegisterFormCommerce}>
      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.containerLogo}>
          <label htmlFor="datosImagen">
            <input
              className={styles.btninput}
              type="file"
              name="photo"
              id="datosImagen"
              hidden
              onChange={handleChangeImage}
            />
            <Avatar
              className={styles.avatar}
              src={photo.url ? photo.url : CommerceLogo}
              alt="Commercelogo"
              id="commerceImage"
              sx={{
                width: 120,
                height: 120,
                cursor: 'pointer',
                marginTop: '20',
              }}
            />
          </label>
        </div>
        <div className={styles.divsInputs}>
          <div className={styles.labelNombre}>
            <label>Nombre del comercio</label>
          </div>
          <div className={styles.divInputNombre}>
            <input
              className={styles.inputNombre}
              type="text"
              name="name"
              value={input.name}
              autoComplete="off"
              onChange={(e) => {
                handleOnChange(e);
                validateLetters(e);
              }}
            />
            <div className={styles.divErrorName}>
              <p className={styles.errors}>{errors.name}</p>
            </div>
          </div>
          <div className={styles.labelEmail}>
            <label>Email de la empresa</label>
          </div>
          <div className={styles.divInputEmail}>
            <input
              className={styles.inputEmail}
              type="texto"
              autoComplete="off"
              name="email"
              value={input.email}
              onChange={(e) => {
                handleOnChange(e);
                validateEmail(e);
              }}
            />
            <div className={styles.divErrorEmail}>
              <p className={styles.errors}>{errors.email}</p>
            </div>
          </div>
          <div className={styles.labelUrl}>
            <label>Url de sitio web</label>
          </div>
          <div className={styles.divInputNombre}>
            <input
              className={styles.inputNombre}
              type="text"
              name="website"
              value={input.website}
              autoComplete="off"
              onChange={(e) => {
                handleOnChange(e);
                validateUrl(e);
              }}
            />
            <div className={styles.divErrorUrl}>
              <p className={styles.errors}>{errors.website}</p>
            </div>
          </div>
          <div className={styles.labelDescripcion}>
            <label>Descripción</label>
          </div>
          <div className={styles.divInputDescripcion}>
            <textarea
              className={styles.inputDescripcion}
              type="text"
              name="description"
              value={input.description}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.divlabelPhone}>
            <label className={styles.labelPhone}>Teléfono</label>
          </div>
          <div className={styles.phoneDivs}>
            <div className={styles.divInputAndErrorAreaCod}>
              <input
                className={styles.areacod}
                type="text"
                name="areaCode"
                value={input.areaCode}
                placeholder="Cód. Área"
                onChange={(e) => {
                  handleOnChange(e);
                  validateNum(e);
                }}
              />
              <div className={styles.divErrorAreaCod}>
                <p className={styles.errors}>{errors.areaCode}</p>
              </div>
            </div>
            <div className={styles.divInputAndErrorTelefono}>
              <input
                className={styles.phonenumber}
                type="text"
                name="phone"
                value={input.phone}
                placeholder="Número"
                onChange={(e) => {
                  handleOnChange(e);
                  validateNum(e);
                }}
              />
              <div className={styles.divErrorTelefono}>
                <p className={styles.errors}>{errors.phone}</p>
              </div>
            </div>
          </div>
          <div className={styles.divlabelDir}>
            <label className={styles.labelDir}>Dirección</label>
          </div>
          <div className={styles.divInputsCalleyNum}>
            <div className={styles.divInputAndErrorCalle}>
              <input
                className={styles.calle}
                type="text"
                name="street"
                value={input.street}
                placeholder="Calle"
                onChange={(e) => {
                  handleOnChange(e);
                  validateLetters(e);
                }}
              />
              <div className={styles.divErrorDireccion}>
                <p className={styles.errors}>{errors.street}</p>
              </div>
            </div>
            <div className={styles.divInputAndErrorNumCalle}>
              <input
                className={styles.numCalle}
                type="text"
                name="number"
                value={input.number}
                placeholder="Número de calle"
                onChange={(e) => {
                  handleOnChange(e);
                  validateNum(e);
                }}
              />
              <div className={styles.divErrorCalle}>
                <p className={styles.errors}>{errors.number}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divCodPostal}>
          <div className={styles.divInputAndErrorCodPostal}>
            <input
              className={styles.inputCodPostal}
              type="text"
              name="zipcode"
              value={input.zipcode}
              placeholder="Cód. Postal"
              onChange={(e) => {
                handleOnChange(e);
                validateNum(e);
              }}
            />
            <div className={styles.divErrorPostalCod}>
              <p className={styles.errors}>{errors.zipcode}</p>
            </div>
          </div>
        </div>
        <div className={styles.divCiudadyProv}>
          <div>
            <input
              className={styles.inputProv}
              type="text"
              placeholder="Provincia"
              value={termProvincia}
              onChange={handleInputProvincia}
            />
            {provincia.length > 0 && (
              <div className={styles.containerResult}>
                <div className={styles.containerElement}>
                  {provincia.map((prov) => (
                    <div
                      className={styles.elements}
                      key={prov.id}
                      provid={prov.id}
                      provname={prov.name}
                      onClick={handleProvincia}
                    >
                      {prov.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <input
              className={styles.inputCiudad}
              type="text"
              placeholder="Ciudad"
              value={termCiudad}
              onChange={handleInputCiudad}
            />
            {ciudad.length > 0 && (
              <div className={styles.containerResult}>
                <div className={styles.containerElement}>
                  {ciudad.map((city) => (
                    <div
                      className={styles.elements}
                      key={city.id}
                      cityid={city.id}
                      cityname={city.name}
                      onClick={handleCiudad}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.divButton}>
          <Button
            className={styles.buttons}
            type="submit"
            sx={{
              backgroundColor: '#7ED957',
              '&:hover': { backgroundColor: '#7ED95790 !important' },
              marginTop: 4,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            ACTUALIZAR CAMBIOS
          </Button>

          <Button
            className={styles.buttons}
            onClick={handleBack}
            sx={{
              backgroundColor: '#8865b9',
              '&:hover': { backgroundColor: '#7ED95790 !important' },
              marginTop: 4,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            CANCELAR
          </Button>
        </div>
      </form>
    </div>
  );
}
