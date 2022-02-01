/* eslint-disable func-names */
import { api, apiWithToken } from '../../services/api';

import types from '../types/productTypes';

// eslint-disable-next-line import/prefer-default-export
export const agregarProducto = () => async (dispatch) => {
  try {
    return dispatch({
      type: types.agregarProducto,
      payload: [],
    });
  } catch (err) {
    return console.log(err);
  }
};

export function getProducts(params = {}) {
  const {
    lote,
    size,
    page,
    categoryName,
    categoryId,
    minPrice,
    maxPrice,
    expirationDate,
    order,
  } = {
    lote: params.lote || '',
    size: params.size || 6, // CANTIDAD de productos por pagina
    page: params.page || '',
    categoryName: params.categoryName || '',
    categoryId: params.categoryId || '',
    minPrice: params.minPrice || '',
    maxPrice: params.maxPrice || '',
    expirationDate: params.expirationDate || '',
    order: params.order || '',
  };
  // eslint-disable-next-line func-names
  return async function (dispatch) {
    try {
      const json = await api.get(
        `/products?lote=${lote}&size=${size}&page=${page}&categoryName=${categoryName}&categoryId=${categoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}&expirationDate=${expirationDate}&order=${order}`
      );

      return dispatch({
        type: types.getProducts,
        payload: json.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
}

export function searchProducts(name) {
  // eslint-disable-next-line prefer-template
  console.log('esto es payload' + name);
  return {
    type: types.searchProducts,
    // eslint-disable-next-line no-undef
    payload: name,
  };
}

export function postProduct(payload, photo) {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line func-names
  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  return async function (dispatch) {
    try {
      const form = new FormData();

      form.append('file', photo);
      form.append('data', JSON.stringify(payload));

      const response = await apiWithToken.post('/products', form);

      return response;
    } catch (err) {
      return console.log(err);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      const response = await api.get('/products/categories');

      return dispatch({
        type: types.getCategories,
        payload: response.data,
      });
    } catch (err) {
      return console.log(err);
    }
  };
}
