import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2';
import styles from './OngForm.module.css';
import Steps from '../OngPageInfo/Steps';
import CarreteImg from '../OngPageInfo/CarreteImg';
import { NuevoLote, Cantidad, Descripcion, Categoria } from './TextfielForm';
import { getCategories } from '../../../redux/actions/productActions';
import { postDonations } from '../../../redux/actions/CompaniesActions';

import logo from '../../../assets/foodAvatar.png';
import Loading from '../../Loading/Loading';

export default function OngForm() {
  const dispatch = useDispatch();

  const params = useParams();

  const categories = useSelector((state) => state.product.categories);

  const [error, setError] = useState({});
  // // eslint-disable-next-line no-unused-vars
  const [photo, setPhoto] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const [preview1, setPreview1] = useState(null);

  const [input, setInput] = useState({
    lote: '',
    description: '',
    quantity: 0,
    category: '',
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  function validate(inputs) {
    const errors = {};

    if (!inputs.lote) {
      errors.lote = 'Lote is required !';
    }
    if (!inputs.description) {
      errors.description = 'Descripcion is required ! ';
    }
    if (!inputs.quantity) {
      errors.quantity = 'Cantidad is required !';
    }

    if (!inputs.category) {
      errors.category = 'Category is required';
    }

    return errors;
  }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(input);

    if (Object.keys(errors).length) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: '¡Complete todos los campos!',
      });
    } else if (!photo.name) {
      Swal.fire({
        icon: 'error',
        title: 'Foto del Producto Requerida !',
        text: '¡Subí una foto de tu producto haciendo click sobre la misma !',
      });
    } else if (error.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad incorrecta!',
        text: '¡El número debe ser mayor a cero!',
      });
    } else {
      setIsloading(true);
      dispatch(postDonations(input, photo, params.id)).then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line no-alert
          setIsloading(false);
          setInput({
            lote: '',
            description: '',
            quantity: 0,
            category: '',
          });
          setPhoto({});
          setPreview1(null);
          setOpen(true);
        } else if (res.status !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Fallo la donación',
            text: 'Disculpe en este momento no es posible realizar la donacion, favor contactenos a nuestro centro de atención!',
          });
        }
      });
    }
  }

  function ValidateQuantity(event) {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });

    if (value < 0) {
      setError({
        error,
        [name]: 'El numero debe ser > a 0',
      });
    } else {
      setError({
        ...error,
        [name]: '',
      });
    }
  }

  // eslint-disable-next-line prefer-const
  let productPhoto = logo;

  const handleChangeImage = ({ target }) => {
    const image = target.files[0];

    const preview = document.querySelector('#productImage img');

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
        setPreview1(reader.result);
      };

      reader.readAsDataURL(image);
      setPhoto(target.files[0]);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Steps />
      </div>

      <div className={styles.patern}>
        <div className={styles.carrete}>
          <CarreteImg />
        </div>
        <div>
          <div className={styles.formcont}>
            <form className={styles.formcont} onSubmit={handleSubmit}>
              <div className={styles.generalcont}>
                <Typography
                  variant="h4"
                  gutterBottom
                  component="div"
                  sx={{
                    color: '#7ED957',
                    marginBottom: 2,
                    textAlign: 'center',
                  }}
                >
                  Realice una donación!
                </Typography>

                <div className={styles.imagecontent}>
                  <div className={styles.divupload}>
                    <label htmlFor="datosImagen" className={styles.label}>
                      <input
                        className={styles.btninput}
                        type="file"
                        name="file"
                        id="datosImagen"
                        hidden
                        onChange={handleChangeImage}
                      />

                      <Avatar
                        src={preview1 || productPhoto}
                        alt="logo"
                        id="productImage"
                        sx={{ width: 150, height: 150, cursor: 'pointer' }}
                      />
                    </label>
                  </div>

                  <div className={styles.divcategorias}>
                    <Categoria
                      setInput={setInput}
                      input={input}
                      categories={categories} // eslint-disable-next-line react/jsx-no-bind
                      handleOnChange={handleOnChange}
                      autoComplete='off'
                    />
                  </div>
                </div>

                <div className={styles.cont}>
                  <div className={styles.contname}>
                    <div className={styles.divnuevolote}>
                      <NuevoLote
                      autoComplete='off'
                        setInput={setInput}
                        input={input} // eslint-disable-next-line react/jsx-no-bind
                        handleOnChange={handleOnChange} // />
                      />
                    </div>
                  </div>
                  <div className={styles.contamout}>
                    <div className={styles.divcantidad}>
                      <Cantidad
                      autoComplete='off'
                        setInput={setInput}
                        input={input}
                        name="quantity"
                        // eslint-disable-next-line react/jsx-no-bind
                        handleOnChange={handleOnChange}
                        // eslint-disable-next-line react/jsx-no-bind
                        ValidateQuantity={ValidateQuantity}
                      />
                      <div classsName={styles.quantityError}>
                        <p className={styles.error}>
                          {error.quantity && error.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Descripcion
                  autoComplete='off'
                    className={styles.description}
                    setInput={setInput}
                    input={input}
                    // eslint-disable-next-line react/jsx-no-bind
                    handleOnChange={handleOnChange}
                  />
                </div>
                <Button
                  // onClick={() => handleOnclick()}
                  type="submit"
                  sx={{
                    backgroundColor: '#7ED957',
                    '&:hover': { backgroundColor: '#7ED95790 !important' },
                    marginTop: 5,
                    paddingLeft: 5,
                    marginBottom: 7,
                    paddingRight: 5,
                  }}
                >
                  REALIZAR DONACION !
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      gutterBottom
                      component="div"
                      sx={{
                        color: '#7ED957',
                        marginBottom: 2,
                        textAlign: 'center',
                      }}
                    >
                      Donación realizada con Exito !!
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      variant="h6"
                      gutterBottom
                      component="div"
                      sx={{ color: '#8865b9', marginTop: '1em' }}
                    >
                      Muchas gracias por tu colaboración, es un gran aporte para
                      construir un mundo mejor !
                    </Typography>
                  </Box>
                </Modal>
                {isLoading && <Loading />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
