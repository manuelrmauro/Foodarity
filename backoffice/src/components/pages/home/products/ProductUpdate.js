/* eslint-disable react/jsx-props-no-spreading */
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
import Autocomplete from '@mui/material/Autocomplete';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import defaultAvatar from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';
import { finishLoading, startLoading } from '../../../../redux/actions/ui';

export const ProductUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  const initialFormValues = {
    lote: '',
    description: '',
    quantity: '',
    price: '',
    expirationDate: '',
    publicationDate: '',
    status: '',
    category_id: null,
    category: null,
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      lote: Yup.string().max(255).required('El lote es requerido'),
      description: Yup.string()
        .max(255)
        .required('La descripcion es requerida'),
      quantity: Yup.number().required('La cantidad es requerida'),
      price: Yup.number().required('El precio es requerido'),
      expirationDate: Yup.string().required(
        'La fecha de vencimiento es requerida'
      ),
      publicationDate: Yup.string().required(
        'La fecha de vencimiento es requerida'
      ),
      status: Yup.string(),
    }),
    onSubmit: () => {
      const bodyRequest = {
        lote: formik.values.lote,
        description: formik.values.description,
        quantity: formik.values.quantity,
        price: formik.values.price,
        expirationDate: formik.values.expirationDate,
        publicationDate: formik.values.publicationDate,
        status: formik.values.status,
        category: formik.values.category,
      };
      if (file) {
        const formdata = new FormData();
        formdata.append('file', file, file.name);
        dispatch(startLoading());
        apiWithToken
          .patch(`/admin/products/upload/${id}`, formdata)
          .then(() => {
            apiWithToken
              .put(`/admin/products/${id}`, formik.values)
              .then(() => {
                dispatch(finishLoading());
                Swal.fire({
                  icon: 'success',
                  title: 'Actualizado',
                  text: 'Producto actualizado correctamente.',
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
          .put(`/admin/products/${id}`, bodyRequest)
          .then(() => {
            dispatch(finishLoading());
            Swal.fire({
              icon: 'success',
              title: 'Actualizado',
              text: 'Producto actualizado correctamente.',
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

  useEffect(async () => {
    if (id) {
      const response = await apiWithToken.get(`/admin/products/id/${id}`);
      setProduct(response.data);
    }
  }, []);

  useEffect(async () => {
    const response = await apiWithToken.get(`/admin/categories/show`);
    setCategories(response.data);
  }, []);

  let profilePhoto = defaultAvatar;

  if (product) {
    formik.initialValues.lote = product.lote;
    formik.initialValues.description = product.description;
    formik.initialValues.quantity = product.quantity;
    formik.initialValues.price = product.price;
    formik.initialValues.expirationDate = product.expirationDate;
    formik.initialValues.publicationDate = product.publicationDate;
    formik.initialValues.status = product.status;
    formik.initialValues.category_id = product.category.id;
    formik.initialValues.category = product.category;
    if (product.photo) {
      profilePhoto = product.photo.url;
    } else {
      profilePhoto = defaultAvatar;
    }
  }

  const handleBack = () => {
    navigate('/products', { replace: true });
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

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Actualizar Producto
      </Typography>
      <Divider />
      <Grid container spacing={3} pt={2}>
        {/* Chart */}
        <Grid item xs={12} lg={12}>
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
                <Autocomplete
                  freeSolo
                  fullWidth
                  id="select_category"
                  disableClearable
                  options={categories}
                  value={formik.initialValues.category}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    formik.initialValues.category_id = newValue.id;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleccione una Categoria"
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
                <TextField
                  error={Boolean(formik.touched.lote && formik.errors.lote)}
                  fullWidth
                  helperText={formik.touched.lote && formik.errors.lote}
                  label="Lote"
                  margin="normal"
                  name="lote"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.lote}
                  variant="standard"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(
                    formik.touched.quantity && formik.errors.quantity
                  )}
                  fullWidth
                  helperText={formik.touched.quantity && formik.errors.quantity}
                  label="Cantidad"
                  margin="normal"
                  name="quantity"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.quantity}
                  variant="standard"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(formik.touched.price && formik.errors.price)}
                  fullWidth
                  helperText={formik.touched.price && formik.errors.price}
                  label="Precio"
                  margin="normal"
                  name="price"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.price}
                  variant="standard"
                  autoComplete="off"
                />
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        formik.touched.publicationDate &&
                          formik.errors.expirationDate
                      )}
                      fullWidth
                      helperText={
                        formik.touched.publicationDate &&
                        formik.errors.publicationDate
                      }
                      label="Fecha de Publicacion"
                      margin="normal"
                      name="publicationDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="date"
                      value={formik.values.publicationDate}
                      variant="standard"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        formik.touched.expirationDate &&
                          formik.errors.expirationDate
                      )}
                      fullWidth
                      helperText={
                        formik.touched.expirationDate &&
                        formik.errors.expirationDate
                      }
                      label="Fecha de expiracion"
                      margin="normal"
                      name="expirationDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="date"
                      value={formik.values.expirationDate}
                      variant="standard"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
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
                      <MenuItem value="published">Publicado</MenuItem>
                      <MenuItem value="finished">Finalizado</MenuItem>
                      <MenuItem value="canceled">Cancelado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Description */}
            <Divider sx={{ padding: 1 }} />
            <Grid container direction="row">
              <Grid container item xs={12} pl={3} pt={2}>
                <Typography variant="h6" gutterBottom component="div">
                  Descripcion
                </Typography>
              </Grid>
              <Grid container item xs={12} pl={3}>
                <TextField
                  id="description"
                  multiline
                  rows={4}
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  style={{ width: '90%' }}
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
