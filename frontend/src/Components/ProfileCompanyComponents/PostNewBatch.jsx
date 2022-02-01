/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import styles from './PostNewBatch.module.css';

import {
  NuevoLote,
  Cantidad,
  Amount,
  Fecha,
  Categoria,
} from './TextFieldSizes';
import { postProduct, getCategories } from '../../redux/actions/productActions';
import Descripcion from './MultiLineTextFields';
import logo from '../../assets/foodAvatar.png';
import Loading from '../Loading/Loading';

export default function PostNewBatch() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);
  // const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState({});
  // const [photoPrev, setPhotoPrev] = useState('');
  // eslint-disable-next-line no-unused-vars

  const [error, setError] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const [preview1, setPreview1] = useState(null);

  const [input, setInput] = useState({
    lote: '',
    description: '',
    quantity: 0,
    price: 0,
    publicationDate: new Date().toLocaleDateString('en-ca'),
    expirationDate: new Date().toLocaleDateString('en-ca'),
    category: '',
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function validate(input) {
    const errors = {};

    if (!input.lote) {
      errors.lote = 'Lote is required !';
    }
    if (!input.description) {
      errors.description = 'Descripcion is required ! ';
    }
    if (!input.quantity) {
      errors.quantity = 'Cantidad is required !';
    }

    if (!input.price) {
      errors.price = 'Price is required';
    }

    if (!input.expirationDate) {
      errors.exprirationDate = 'Date is required';
    }

    if (!input.category) {
      errors.category = 'Category is required';
    }

    if (input.photo === {}) {
      errors.photo = 'Photo is required';
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
    } else if (error.price === 'El numero debe ser > a 0') {
      Swal.fire({
        icon: 'error',
        title: 'Precio incorrecto!',
        text: '¡El número debe ser mayor a cero!',
      });
    } else if (error.price === 'Solo Números') {
      Swal.fire({
        icon: 'error',
        title: 'Precio incorrecto!',
        text: '¡Solo se aceptan numeros!',
      });
    } else if (error.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad incorrecta!',
        text: '¡El número debe ser mayor a cero!',
      });
    } else {
      setIsloading(true);
      dispatch(postProduct(input, photo)).then((res) => {
        if (res.status === 200) {
          setIsloading(false);
          Swal.fire({
            icon: 'success',
            title: 'Producto Publicado con exito!',
            text: 'Ahora podrá verlo en la seccion de PRODUCTOS y cancelarlo si así lo desea',
          });

          // eslint-disable-next-line no-alert
          setInput({
            lote: '',
            description: '',
            quantity: 0,
            price: 0,
            publicationDate: new Date().toLocaleDateString('en-ca'),
            expirationDate: new Date().toLocaleDateString('en-ca'),
            category: '',
          });

          setPhoto({});
          setPreview1(null);
          // eslint-disable-next-line no-alert
        } else if (res.status !== 200) {
          Swal.fire({
            icon: 'error',
            title: 'Error en la publicación!',
            text: 'Disculpe en este momento no es posible realizar la publicación favor intente nuevamente mas tarde comuniquse con nuestro centro de atención',
          });

          setInput({
            lote: '',
            description: '',
            quantity: 0,
            price: 0,
            publicationDate: new Date().toLocaleDateString('en-ca'),
            expirationDate: new Date().toLocaleDateString('en-ca'),
            category: '',
          });

          setPhoto({});
          setPreview1(null);
        }
      });
    }
  }

  // eslint-disable-next-line prefer-const
  let productPhoto = logo;

  function validatePrice(event) {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
    if (value < 0) {
      setError({
        ...error,
        [name]: 'El numero debe ser > a 0',
      });
      // eslint-disable-next-line no-useless-escape
    } else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)) {
      setError({
        ...error,
        [name]: 'Solo Números',
      });
    } else {
      setError({
        ...error,
        [name]: '',
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
    <div className={styles.formcont}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ color: '#7ED957', marginBottom: 1, textAlign: 'center' }}
      >
        Publique un nuevo producto !
      </Typography>

      <form className={styles.formcont} onSubmit={handleSubmit}>
        <div className={styles.generalcont}>
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
                <p className={styles.subifoto} id="datosImagen">
                  Subi una foto !
                </p>
              </label>
            </div>

            <div className={styles.divcategorias}>
              <Categoria
                setInput={setInput}
                input={input}
                categories={categories}
                autoComplete='off'
                // eslint-disable-next-line react/jsx-no-bind
                handleOnChange={handleOnChange}
              />
            </div>
          </div>

          <div className={styles.cont}>
            <div className={styles.contname}>
              <div className={styles.divnuevolote}>
                <NuevoLote
                  setInput={setInput}
                  input={input}
                  autoComplete='off'
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
              </div>
              <div className={styles.divprecio}>
                <Fecha
                  setInput={setInput}
                  input={input}
                  autoComplete='off'
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
              </div>
            </div>

            <div className={styles.contamout}>
              <div className={styles.divcantidad}>
                <Cantidad
                  setInput={setInput}
                  input={input}
                  name="quantity"
                  autoComplete='off'
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                  // eslint-disable-next-line react/jsx-no-bind
                  ValidateQuantity={ValidateQuantity}
                  // eslint-disable-next-line react/jsx-no-bind
                />
                <div classsName={styles.quantityError}>
                  <p className={styles.error}>
                    {error.quantity && error.quantity}
                  </p>
                </div>
              </div>

              <div className={styles.divprecio}>
                <Amount
                  setInput={setInput}
                  input={input}
                  name="price"
                  autoComplete='off'
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                  // eslint-disable-next-line react/jsx-no-bind
                  validatePrice={validatePrice}
                  // eslint-disable-next-line react/jsx-no-bind
                />
                <div>
                  <p className={styles.error}>{error.price && error.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Descripcion
              className={styles.description}
              setInput={setInput}
              input={input}
              autoComplete='off'
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
              paddingRight: 5,
            }}
          >
            PUBLICAR PRODUCTO
          </Button>
          {isLoading && <Loading />}
        </div>
      </form>
    </div>
  );
}
