import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Login } from '../components/pages/login/Login';
import { startCheking } from '../redux/actions/authActions';
import { HomeRoute } from './HomeRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 999,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute isAuisAuthenticated={!!id}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute isAuisAuthenticated={!!id}>
              <HomeRoute />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
