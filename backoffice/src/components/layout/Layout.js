import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import { Header } from './header/Header';
import { Aside } from './aside/Aside';
import { startLogout } from '../../redux/actions/authActions';
import { Loading } from '../ui/Loading';

const mdTheme = createTheme();

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roleId } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);

  useEffect(() => {
    if (roleId !== 2) {
      dispatch(startLogout());
      navigate('/home', { replace: true });
    }
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Aside />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
      {loading && <Loading />}
    </ThemeProvider>
  );
};
