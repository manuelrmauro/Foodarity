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
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import defaultAvatar from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';
import { finishLoading, startLoading } from '../../../../redux/actions/ui';

export const UserResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(async () => {
    if (id) {
      const response = await apiWithToken.get(`/admin/users/${id}`);
      setUser(response.data);
    }
  }, []);

  const initialFormValues = {
    password: '',
    confirmpass: '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      password: Yup.string().required('El password es requerido'),
      confirmpass: Yup.string()
        .required('El password de confirmación es requerido')
        .test(
          'passwords-match',
          'Las password deben ser iguales',
          (value) => formik.values.password === value
        ),
    }),
    onSubmit: () => {
      // console.log(formik.values);

      dispatch(startLoading());
      apiWithToken
        .patch(`/admin/users/password/${id}`, formik.values)
        .then(() => {
          dispatch(finishLoading());
          Swal.fire({
            icon: 'success',
            title: 'Password Actualizada',
            text: 'La password se actualizo correctamente.',
          });
          navigate('/users', { replace: true });
        })
        .catch(() => {
          dispatch(finishLoading());
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar!',
            text: 'Consulte al administrador.',
          });
        });
    },
  });

  let profilePhoto = defaultAvatar;
  if (user) {
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

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Reset Password
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
                  <input type="file" name="file" id="datosImagen" hidden />
                  <Avatar
                    src={profilePhoto}
                    alt="Perfil"
                    id="profilImage"
                    sx={{ width: 200, height: 200 }}
                  />
                </label>
              </Grid>
              <Grid container item xs={6} pl={3}>
                {user && (
                  <>
                    <TextField
                      fullWidth
                      label="Nombre"
                      margin="normal"
                      defaultValue={`${user.name}`}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      defaultValue={`${user.email}`}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </>
                )}

                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="standard"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(
                    formik.touched.confirmpass && formik.errors.confirmpass
                  )}
                  fullWidth
                  helperText={
                    formik.touched.confirmpass && formik.errors.confirmpass
                  }
                  label="Confirm Password"
                  margin="normal"
                  name="confirmpass"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirmpass}
                  variant="standard"
                  autoComplete="off"
                />
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
