/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Swal from 'sweetalert2';
import axios from 'axios';
import MapPicker from 'react-google-map-picker';
// import Header from '../../Components/Header/Header';
import styles from './RegisterFormCommerce.module.css';
import CommerceLogo from '../../assets/Mask-Group.png';
import ONGLogo from '../../assets/caridad-1.png';
import { api, apiWithToken } from '../../services/api';
import { registerComerce } from '../../redux/actions/CompaniesActions';
import Terminos from '../../Components/Term&Conditions/Terminos';
import AlertOng from '../../Components/Alertas/AlertEnviarSolicitud';

let time = null;
let time2 = null;

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function RegisterFormCompany({ type }) {
  const { id: userId } = useSelector((state) => state.auth);
  const [provincia, setprovincia] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [termProvincia, setTermProvincia] = useState('');
  const [termCiudad, setTermCiudad] = useState('');
  const [errors, setErrors] = useState({});
  const initialFormValues = {
    stateId: null,
    cityId: null,
  };
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialFormValues);
  // const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    website: '',
    email: '',
    description: '',
    areaCode: '',
    phone: '',
    street: '',
    number: '',
    zipcode: '',
    type,
  });

  // GOOGLE MAPS

  const [defaultLocation, setDefaultLocation] = useState();
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(17);
  const [showMap, setShowMap] = useState(false);

  const handleChangeLocation = (latt, lonn) => {
    setLocation({ lat: latt, lng: lonn });
  };

  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom);
  };

  useEffect(() => {
    if (!userId) {
      window.location.href = '/';
    } else {
      apiWithToken.get(`/users/${userId}`).then((res) => {
        if (res.data.company_id) {
          window.location.href = '/home';
        }
      });
    }
  }, []);

  useEffect(() => {
    if (formValues.cityId) {
      setShowMap(false);
      api.get(`/cities/id/${formValues.cityId}`).then((res) => {
        const loc = { lat: res.data.lat, lng: res.data.lon };
        const city = res.data.name;
        const state = res.data.state.name;
        if (city && state && input.street && input.number) {
          const address = `${input.street} ${input.number}, ${city}, ${state}`;
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
            )
            .then((resp) => {
              if (resp.data.status === 'OK') {
                const newLoc = resp.data.results[0].geometry.location;
                setDefaultLocation(newLoc);
                setLocation(newLoc);
              }
            });
        } else {
          setDefaultLocation(loc);
          setLocation(loc);
        }
        setShowMap(true);
      });
    }
  }, [formValues.cityId]);

  // GOOGLE MAPS

  const [checked, setChecked] = React.useState(true);
  const [isAllow, setIsAllow] = React.useState(false);

  useEffect(() => {
    if (
      !checked &&
      Object.values(errors).filter((e) => e !== '').length === 0 &&
      Object.values(input).filter((e, i) => e === '' && i !== 1).length === 0 &&
      Object.values(formValues).filter((e) => e === null).length === 0
    )
      setIsAllow(true);
    else setIsAllow(false);
  }, [checked, errors, input, formValues]);

  const handleCheck = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };

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
        [name]: 'La URL no es valida!',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateAreacode = (e) => {
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

  const validateNum = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    // eslint-disable-next-line no-useless-escape
    if (
      // eslint-disable-next-line no-useless-escape
      !/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)
    ) {
      setErrors({
        ...errors,
        [name]: 'Solo Numeros',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // const validateTextNum = (e) => {
  //   const { name, value } = e.target;
  //   setInput({
  //     ...input,
  //     [name]: value,
  //   });
  //   // eslint-disable-next-line no-useless-escape
  //   if (!/^[aA-zZ0-9_-]{3,16}$/.test(value)) {
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
    const finalAddress = { ...formValues, location };
    if (
      !errors.name &&
      !errors.website &&
      !errors.description &&
      !errors.areaCode &&
      !errors.phone &&
      !errors.street &&
      !errors.number &&
      !errors.zipcode
      // eslint-disable-next-line no-empty
    ) {
      dispatch(registerComerce(input, finalAddress)).then(() => {
        window.location.href = '/home';
      });
      /* Swal.fire({
        icon: 'success',
        title: 'Bien',
        text: 'El Comercio fue registrado Correctamente',
      }); */
    } else {
      // eslint-disable-next-line no-alert

      Swal.fire({
        icon: 'error',
        title: 'Oppss!',
        text: 'Favor complete todos los campos !',
      });
    }
  };
  return (
    <div className={styles.RegisterFormCommerce}>
      {/* <Header /> */}
      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
        {type === 1 ? (
          <div className={styles.containerLogo}>
            <div className={styles.commerceLogo}>
              <img
                className={styles.imgLogo}
                src={CommerceLogo}
                alt="CommerLogo"
              />
            </div>
          </div>
        ) : (
          <div className={styles.containerLogo}>
            <div className={styles.ongLogo}>
              <img className={styles.imgLogo} src={ONGLogo} alt="CommerLogo" />
            </div>
          </div>
        )}
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
                  validateAreacode(e);
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
                // validateTextNum(e);
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
              disabled={!input.street && !input.number && !input.zipcode}
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
              disabled={!formValues.stateId}
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
        {showMap && (
          <div className={styles.mapContainer}>
            <label className={styles.labelDir}>Tu ubicación exacta</label>
            <div className={styles.map}>
              <MapPicker
                defaultLocation={defaultLocation}
                zoom={zoom}
                style={{ height: '100%', widht: '100%' }}
                mapTypeId="roadmap"
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey={GOOGLE_API_KEY}
              />
            </div>
          </div>
        )}

        <div className={styles.Terms}>
          {/* BOTON DE ACEPTAR TERMINOS Y CONDICIONES: Dicho botón se encuentra 
          dentro del componente Terminos, si se quiere editar el CSS de este botón
          debes editarlo desde el componente Terminos, que se encuentra dentro de la carpeta Componentes. */}

          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label={
              <span>
                <span>ACEPTAR </span>
                <span>
                  <Terminos />
                </span>
              </span>
            }
            sx={{
              color: 'secondary',
              fontStyle: 'bold',
            }}
            onChange={(e) => handleCheck(e)}
          />
        </div>

        <div className={styles.divButton}>
          {/* BOTON DE ENVIAR SOLICITUD: Dicho botón se encuentra 
          dentro del componente Alert Ong y para conectar el submit 
          con el backend debe configurarse en ese mismo componente AlertOng */}
          <AlertOng display={!isAllow} />
        </div>
      </form>
    </div>
  );
}
