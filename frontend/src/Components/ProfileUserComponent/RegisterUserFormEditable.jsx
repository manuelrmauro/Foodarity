/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import estilos from './RegisterUserFormEditable.module.css';
import { updateUser } from '../../redux/actions/userActions';

const Input = styled('input')({
  display: 'none',
});

export default function RegisterUserFormEditable({ detail }) {
  const dispatch = useDispatch();

  const [photo, setPhoto] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [data, setData] = React.useState({
    id: localStorage.getItem('id'),
    name: detail.name || '',
    email: detail.email || '',
    phone: detail.phone || '',
  });
  const [preview, setPreview] = React.useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data, photo));
    Swal.fire({
      icon: 'success',
      title: 'Actualizado',
      text: 'Usuario actualizado correctamente.',
    }).then(() => {
      window.location.reload(false);
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imgHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    const formPhoto = new FormData();
    formPhoto.append('file', e.target.files[0]);
    setPhoto(formPhoto);
  };

  const imageNull =
    'https://res.cloudinary.com/dxbtqclyu/image/upload/v1642367029/Captura_de_pantalla_2022-01-16_150126_l0f8w3.png';

    const validateLetters = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
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
      setData({
        ...data,
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

    const validateNum = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
      // eslint-disable-next-line no-useless-escape
      if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/im.test(value)) {
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


  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: '#7ED957',
          '&:hover': { backgroundColor: '#7ED95790 !important' },
          marginTop: 5,
        }}
      >
        ACTUALIZAR DATOS
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ marginTop: 10, zIndex: 9999 }}
      >
        <div className={estilos.contenedor}>
          <FormGroup>
            {/* TITULO */}
            <div className={estilos.cabeza}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ color: '#3E2463', marginTop: 1, position: 'static' }}
              >
                ACTUALIZAR INFORMACIÓN
              </Typography>
            </div>

            {/* CAMBIAR FOTO */}
            <div className={estilos.photo}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div>
                  <img
                    className={estilos.imgLogo}
                    src={detail.photo ? detail.photo.url : preview || imageNull}
                    alt="img"
                  />
                </div>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => {
                      imgHandler(e);
                    }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <h5>Cambiar Foto de Perfil</h5>
              </Stack>
            </div>

            {/* INPUTS: NOMBRE, EMAIL Y CONTRASEÑA */}
            <div className={estilos.inputs1}>
              <h5>Nombre</h5>
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={data.name}
                onChange={(e) => {
                  handleChange(e);
                  validateLetters(e);
                }}
              />
              <p className={estilos.errors}>{errors.name}</p>
              <h5>Email</h5>
              <input
                type="text"
                name="email"
                autoComplete="off"
                value={data.email}
                disabled
                onChange={(e) => {
                  handleChange(e);
                  validateEmail(e);
                }}
              />
               <p className={estilos.errors}>{errors.email}</p>
              <h5>Número Celular</h5>
              <input
                type="text"
                name="phone"
                autoComplete="off"
                value={data.phone}
                onChange={(e) => {
                  handleChange(e);
                  validateNum(e);
                }}
              />
               <p className={estilos.errors}>{errors.phone}</p>
            </div>
          </FormGroup>

          {/* BOTONES: CANCELAR Y ACEPTAR */}
          <div className={estilos.botones}>
            <div>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: '#7ED957',
                  '&:hover': { backgroundColor: '#7ED95790 !important' },
                  marginTop: 5,
                  marginRight: 5,
                }}
              >
                CANCELAR
              </Button>
            </div>
            <div>
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                  handleClose();
                }}
                sx={{
                  backgroundColor: '#7ED957',
                  '&:hover': { backgroundColor: '#7ED95790 !important' },
                  marginTop: 5,
                }}
              >
                GUARDAR
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
