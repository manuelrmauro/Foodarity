import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';

import logo from '../../../assets/WEB-background-logo.png';
import {
  startGoogleLogin,
  startLogin,
} from '../../../redux/actions/authActions';

const theme = createTheme();

export const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Tiene que ser un email valido')
        .max(255)
        .required('El email es requerido'),
      password: Yup.string()
        .min(4, 'Minimo 4 caractes')
        .max(12, 'Maximo 12 Caracteres')
        .required('La password es requerida'),
    }),
    onSubmit: () => {
      const { email, password } = formik.values;
      return dispatch(startLogin(email, password));
    },
  });

  const responseGoogleSucces = ({ tokenId }) => {
    return dispatch(startGoogleLogin(tokenId));
  };
  const responseGoogleFail = (response) => {
    console.log(response);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="logo" width={400} />
          <Typography component="h2" variant="h5">
            Ingresar
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{ marginBottom: '1em' }}
            >
              Ingresar
            </Button>
            {/* <GoogleLogin
              clientId="327655390134-3dkok4tsgubva7v5gj7drncddv260lor.apps.googleusercontent.com"
              buttonText="Continuar con Google"
              onSuccess={responseGoogleSucces}
              onFailure={responseGoogleFail}
              cookiePolicy="single_host_origin"
              style={{ width: '100%',display:'block' }}
            /> */}
            <GoogleLogin
              clientId="327655390134-3dkok4tsgubva7v5gj7drncddv260lor.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  fullWidth
                  size="large"
                  color="error"
                  startIcon={<GoogleIcon />}
                  variant="outlined"
                >
                  Continuar con google
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogleSucces}
              onFailure={responseGoogleFail}
              cookiePolicy="single_host_origin"
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
