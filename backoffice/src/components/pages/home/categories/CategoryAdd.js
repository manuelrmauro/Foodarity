/* eslint-disable no-unused-vars */
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

export const CategoryAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormValues = {
    name: '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('El nombre es requerido'),
    }),
    onSubmit: () => {
      // console.log(formik.values);
      dispatch(startLoading());
      apiWithToken
        .post(`/admin/categories`, formik.values)
        .then(() => {
          dispatch(finishLoading());
          Swal.fire({
            icon: 'success',
            title: 'Creada',
            text: 'Categoria Actualizada correctamente',
          });
        })
        .catch(() => {
          dispatch(finishLoading());
          Swal.fire({
            icon: 'error',
            title: 'No se pudo Crear!',
            text: 'Consulte al administrador.',
          });
        });
    },
  });

  const handleBack = () => {
    navigate('/categories', { replace: true });
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Crear Categoria
      </Typography>
      <Divider />
      <Grid container spacing={3} pt={2}>
        {/* Chart */}
        <Grid item xs={12} lg={6}>
          <Paper
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              p: 1,
            }}
          >
            <Grid container direction="row">
              <Grid container item xs={6} pl={3}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Categoria"
                  margin="normal"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.name}
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
