import { apiWithToken } from '../../services/api';
import types from '../types/cartTypes';

export const getCart = () => {
  return async (dispatch) => {
    try {
      const json = await apiWithToken.get('/cart');
      return dispatch({
        type: types.updateCart,
        payload: json.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const addToCart = (pid, quantity) => {
  return async (dispatch) => {
    try {
      const json = await apiWithToken.post(
        `/cart?pid=${pid}&quantity=${quantity}`
      );
      if (json.status !== 200) {
        return console.log(json.data);
      }
      return dispatch({
        type: types.updateCart,
        payload: json.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const removeInCart = (pid) => {
  return async (dispatch) => {
    try {
      const json = await apiWithToken.delete(`/cart?pid=${pid}`);

      if (json.status !== 200) {
        return console.log(json.data);
      }
      return dispatch({
        type: types.updateCart,
        payload: json.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    try {
      const json = await apiWithToken.put('/cart/clear');
      return dispatch({
        type: types.updateCart,
        payload: json.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
};
