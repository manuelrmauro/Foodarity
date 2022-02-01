import types from '../types/authTypes';
import { api, apiWithToken } from '../../services/api';
import { saveUserProfile, removeUserProfile } from './userActions';

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startCheking = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token') || '';
      const profile = localStorage.getItem('profile') || '';
      // console.log(JSON.parse(profile))

      if (token !== '') {
        const response = await apiWithToken.get('auth/renew');
        const { id, roleId } = response.data;
        localStorage.setItem('token', response.data.token);
        dispatch(
          login({
            id,
            roleId,
          })
        );
        if (profile !== '') {
          dispatch(saveUserProfile(JSON.parse(profile)));
        }
      } else {
        dispatch(checkingFinish());
      }
    } catch (error) {
      dispatch(checkingFinish());
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/auth', { email, password });
      const { id, token, roleId, name, photo, socialPhoto } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem(
        'profile',
        JSON.stringify({ name, photo, socialPhoto })
      );
      dispatch(
        login({
          id,
          roleId,
        })
      );
      dispatch(saveUserProfile({ name, photo, socialPhoto }));
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGoogleLogin = (tokenId) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/auth/social/google', { tokenId });
      const { id, roleId, token, name, photo, socialPhoto } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem(
        'profile',
        JSON.stringify({ name, photo, socialPhoto })
      );
      dispatch(
        login({
          id,
          roleId,
        })
      );
      dispatch(saveUserProfile({ name, photo, socialPhoto }));
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
};

const logout = () => ({
  type: types.authLogout,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(removeUserProfile());
    dispatch(logout());
  };
};
