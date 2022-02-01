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
import { api, apiWithToken } from '../../../../services/api';
import { finishLoading, startLoading } from '../../../../redux/actions/ui';

export const CompanyUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [company, setCompany] = useState();
  const [provincias, setProvincias] = useState([]);
  const [stateId, setStateId] = useState(null);
  const [cities, setCities] = useState([]);
  const [file, setFile] = useState(null);

  const initialFormValues = {
    name: '',
    email: '',
    areaCode: '',
    phone: '',
    website: '',
    status: '',
    type: 1,
    street: '',
    streetNumber: '',
    zipcode: '',
    state_id: null,
    provincia: null,
    city_id: null,
    cities: null,
    description: '',
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('El nombre es requerido'),
      email: Yup.string()
        .email('Tiene que ser un email valido')
        .max(255)
        .required('El email es requerido'),
      areaCode: Yup.string().max(255, 'El valor maximo es de 255 caracteres'),
      phone: Yup.string().max(255, 'El valor maximo es de 255 caracteres'),
      status: Yup.string(),
      street: Yup.string(),
      streetNumber: Yup.number(),
      zipcode: Yup.string().max(255, 'El valor maximo es de 255 caracteres'),
      type: Yup.number(),
    }),
    onSubmit: () => {
      const bodyRequest = {
        name: formik.values.name,
        description: formik.values.description,
        areaCode: formik.values.areaCode,
        phone: formik.values.phone,
        email: formik.values.email,
        website: formik.values.website,
        type: formik.values.type,
        street: formik.values.street,
        number: formik.values.number,
        zipcode: formik.values.zipcode,
        cityId: formik.values.city_id,
        stateId: formik.values.state_id,
        status: formik.values.status,
      };
      if (file) {
        const formdata = new FormData();
        formdata.append('file', file, file.name);
        dispatch(startLoading());
        apiWithToken
          .patch(`/admin/companies/${id}/upload/logo`, formdata)
          .then(() => {
            apiWithToken
              .put(`/admin/companies/${id}`, formik.values)
              .then(() => {
                dispatch(finishLoading());
                Swal.fire({
                  icon: 'success',
                  title: 'Actualizada',
                  text: 'Compania actualizada correctamente.',
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
          .put(`/admin/companies/${id}`, bodyRequest)
          .then(() => {
            dispatch(finishLoading());
            Swal.fire({
              icon: 'success',
              title: 'Actualizada',
              text: 'Compania actualizada correctamente.',
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
      const response = await apiWithToken.get(`/admin/companies/id/${id}`);
      setCompany(response.data);
    }
  }, []);

  useEffect(async () => {
    const response = await api.get(`/states`);
    setProvincias(response.data);
  }, []);

  useEffect(() => {
    if (stateId) {
      api.get(`/cities/${stateId}`).then((response) => {
        setCities([]);
        setCities(response.data);
        document.querySelector('#select_city').value = null;
        formik.initialValues.city_id = null;
        formik.initialValues.cities = null;
      });
    }
  }, [stateId]);

  let profilePhoto = defaultAvatar;

  if (company) {
    formik.initialValues.name = company.name;
    formik.initialValues.email = company.email;
    formik.initialValues.areaCode = company.areaCode || '';
    formik.initialValues.phone = company.phone || '';
    formik.initialValues.status = company.status;
    formik.initialValues.type = company.type.id;
    formik.initialValues.street = company.address.street;
    formik.initialValues.streetNumber = company.address.number;
    formik.initialValues.zipcode = company.address.zipcode;
    formik.initialValues.state_id = company.address.state_id;
    formik.initialValues.provincia = company.address.state;
    formik.initialValues.city_id = company.address.city_id;
    formik.initialValues.cities = company.address.city;
    formik.initialValues.description = company.description;
    formik.initialValues.website = company.website;
    if (company.logo) {
      profilePhoto = company.logo.url;
    } else if (company.socialPhoto) {
      profilePhoto = company.socialPhoto;
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

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Actualizar Compania
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
                  error={Boolean(
                    formik.touched.website && formik.errors.website
                  )}
                  fullWidth
                  helperText={formik.touched.website && formik.errors.website}
                  label="Web Site"
                  margin="normal"
                  name="website"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.website}
                  variant="standard"
                  autoComplete="off"
                />
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        formik.touched.areaCode && formik.errors.areaCode
                      )}
                      fullWidth
                      helperText={
                        formik.touched.areaCode && formik.errors.areaCode
                      }
                      label="Codigo de area"
                      margin="normal"
                      name="areaCode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.areaCode}
                      variant="standard"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      error={Boolean(
                        formik.touched.phone && formik.errors.phone
                      )}
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
                      <MenuItem value="Habilitada">Habilitada</MenuItem>
                      <MenuItem value="Deshabilitada">Deshabilitada</MenuItem>
                      {/* <MenuItem value="Pendiente">Pendiente</MenuItem> */}
                      <MenuItem value="Banneada">Banneada</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="type-label-id">Tipo</InputLabel>
                    <Select
                      labelId="type-label-id"
                      id="type"
                      name="type"
                      value={formik.values.type}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label="type"
                    >
                      <MenuItem value={1}>Comercio</MenuItem>
                      <MenuItem value={2}>ONG</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Address Section */}
            <Divider sx={{ padding: 1 }} />
            <Grid container direction="row">
              <Grid container item xs={12} pl={3} pt={2}>
                <Typography variant="h6" gutterBottom component="div">
                  Direccion
                </Typography>
              </Grid>
              <Grid container item xs={12} pl={3}>
                <Grid container item xs={12} columnSpacing={6}>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(
                        formik.touched.street && formik.errors.street
                      )}
                      fullWidth
                      helperText={formik.touched.street && formik.errors.street}
                      label="Calle"
                      margin="normal"
                      name="street"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.street}
                      variant="standard"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      error={Boolean(
                        formik.touched.streetNumber &&
                          formik.errors.streetNumber
                      )}
                      fullWidth
                      helperText={
                        formik.touched.streetNumber &&
                        formik.errors.streetNumber
                      }
                      label="Numero"
                      margin="normal"
                      name="streetNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.streetNumber}
                      variant="standard"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} columnSpacing={6}>
                  <Grid item xs={3}>
                    <TextField
                      error={Boolean(
                        formik.touched.zipcode && formik.errors.zipcode
                      )}
                      fullWidth
                      helperText={
                        formik.touched.zipcode && formik.errors.zipcode
                      }
                      label="Codigo Postal"
                      margin="normal"
                      name="zipcode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.zipcode}
                      variant="standard"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} columnSpacing={6}>
                  <Grid item xs={6}>
                    <Autocomplete
                      freeSolo
                      id="select_state"
                      disableClearable
                      options={provincias}
                      value={formik.initialValues.provincia}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        formik.initialValues.city_id = null;
                        formik.initialValues.cities = null;
                        setStateId(newValue.id);
                        formik.initialValues.state_id = newValue.id;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione una provincia"
                          variant="standard"
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      freeSolo
                      id="select_city"
                      disableClearable
                      options={cities}
                      value={formik.initialValues.cities}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        formik.initialValues.city_id = newValue.id;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione una Ciudad"
                          variant="standard"
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                          }}
                        />
                      )}
                    />
                  </Grid>
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
