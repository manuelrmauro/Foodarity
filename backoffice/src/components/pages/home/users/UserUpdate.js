import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import defaultAvatar from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';
import { finishLoading, startLoading } from '../../../../redux/actions/ui';

export const UserUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState();
  const [file, setFile] = useState(null);

  useEffect(async () => {
    if (id) {
      const response = await apiWithToken.get(`/admin/users/${id}`);
      setUser(response.data);
    }
  }, []);

  const initialFormValues = {
    name: '',
    email: '',
    phone: '',
    status: false,
    role: 1,
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('El nombre es requerido'),
      email: Yup.string()
        .email('Tiene que ser un email valido')
        .max(255)
        .required('El email es requerido'),
      phone: Yup.string().max(255, 'El valor maximo es de 255 caracteres'),
      status: Yup.boolean().required(),
      role: Yup.number(),
    }),
    onSubmit: () => {
      // console.log(formik.values);
      if (file) {
        const formdata = new FormData();
        formdata.append('file', file, file.name);
        dispatch(startLoading());
        apiWithToken
          .patch(`/admin/users/upload/${id}`, formdata)
          .then(() => {
            apiWithToken
              .put(`/admin/users/${id}`, formik.values)
              .then(() => {
                dispatch(finishLoading());
                Swal.fire({
                  icon: 'success',
                  title: 'Actualizado',
                  text: 'Usuario actualizado correctamente.',
                });
                setFile(null);
              })
              .catch(() => {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo actualizar!',
                  text: 'Consulte al administrador.',
                });
              });
            setFile(null);
          })
          .catch(() => {
            dispatch(finishLoading());
            Swal.fire({
              icon: 'error',
              title: 'No se pudo actualizar!',
              text: 'Consulte al administrador. Error al subir la imagen',
            });
            setFile(null);
          });
      } else {
        dispatch(startLoading());
        apiWithToken
          .put(`/admin/users/${id}`, formik.values)
          .then(() => {
            dispatch(finishLoading());
            Swal.fire({
              icon: 'success',
              title: 'Actualizado',
              text: 'Usuario actualizado correctamente.',
            });
          })
          .catch(() => {
            dispatch(finishLoading());
            Swal.fire({
              icon: 'error',
              title: 'No se pudo actualizar!',
              text: 'Consulte al administrador.',
            });
          });
      }
    },
  });

  let profilePhoto = defaultAvatar;
  if (user) {
    formik.initialValues.name = user.name;
    formik.initialValues.email = user.email;
    formik.initialValues.phone = user.phone || '';
    formik.initialValues.status = user.status;
    formik.initialValues.role = user.role.id;
    if (user.photo) {
      profilePhoto = user.photo.url;
    } else if (user.socialPhoto) {
      profilePhoto = user.socialPhoto;
    } else {
      profilePhoto = defaultAvatar;
    }
  }

  const handleBack = () => {
    navigate('/users', { replace: true });
  };

  const handleChangeImage = ({ target }) => {
    const image = target.files[0];
    const preview = document.querySelector('#profilImage img');

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
      setFile(target.files[0]);
    }
  };

  const handleResetPassword = () => {
    navigate(`/users/resetpass/${user.id}`, { replace: true });
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Actualizar Usuario
      </Typography>
      <Divider />
      <Grid container spacing={3} pt={2}>
        <Grid item xs={12} lg={9}>
          <Paper
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              p: 1,
            }}
          >
            <Grid container direction="row">
              <Grid container item xs={4} p={2} justifyContent="center">
                <label htmlFor="datosImagen">
                  <input
                    type="file"
                    name="file"
                    id="datosImagen"
                    hidden
                    onChange={handleChangeImage}
                  />
                  <Avatar
                    src={profilePhoto}
                    alt="Perfil"
                    id="profilImage"
                    sx={{ width: 200, height: 200, cursor: 'pointer' }}
                  />
                </label>
              </Grid>
              <Grid container item xs={6} pl={3}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nombre"
                  margin="normal"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
                  variant="standard"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Direccion de email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="standard"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Telefono"
                  margin="normal"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phone}
                  variant="standard"
                  autoComplete="off"
                />
                <Grid container item direction="column" xs={6}>
                  <FormControl
                    variant="standard"
                    sx={{ minWidth: 120, marginBottom: 2, marginTop: 1 }}
                  >
                    <InputLabel id="status-label-id">Status</InputLabel>
                    <Select
                      labelId="status-label-id"
                      id="status"
                      name="status"
                      value={formik.values.status}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label="Status"
                    >
                      <MenuItem value>Activo</MenuItem>
                      <MenuItem value={false}>Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="standard"
                    sx={{ minWidth: 120, marginBottom: '1em' }}
                  >
                    <InputLabel id="role-label-id">Role</InputLabel>
                    <Select
                      labelId="role-label-id"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label="Role"
                    >
                      <MenuItem value={1}>User</MenuItem>
                      <MenuItem value={2}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ padding: 1 }} />
            <Grid
              container
              direction="row"
              p={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item ml={2}>
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};
