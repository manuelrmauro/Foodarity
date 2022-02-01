/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
// import axios from 'axios';
import { api, apiWithToken } from '../../services/api';

import types from '../types/companiesTypes';

export const registerComerce = (inputForm, select) => async (dispatch) => {
  try {
    const {
      areaCode,
      description,
      email,
      name,
      number,
      phone,
      street,
      website,
      zipcode,
      type,
    } = inputForm;

    const { cityId, stateId, location } = select;

    const requestData = {
      areaCode,
      description,
      email,
      name,
      number: parseInt(number, 10),
      phone,
      street,
      website,
      zipcode,
      cityId: parseInt(cityId, 10),
      stateId: parseInt(stateId, 10),
      type,
      location,
    };

    const response = await apiWithToken.post('/companies', requestData);
    // TODO: Generar alerta de aviso de que se guardo el Comercio
    return dispatch({
      type: types.registerComerce,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCompanies = () => async (dispatch) => {
  try {
    const response = await api.get('/companies');
    return dispatch({
      type: types.getCompanies,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOngs = () => async (dispatch) => {
  try {
    const response = await api.get('/companies/ongs');

    return dispatch({
      type: types.getOngs,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export function postDonations(payload, photo, id) {
  // eslint-disable-next-line func-names
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line func-names
  return async function (dispatch) {
    try {
      const form = new FormData();

      form.append('file', photo);
      form.append('data', JSON.stringify(payload));

      const response = await apiWithToken.post(`/donation/${id}`, form);

      return response;
    } catch (err) {
      console.log(err);
    }
  };
}
