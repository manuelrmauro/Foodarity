/* eslint-disable consistent-return */
import axios from 'axios';
import { apiWithToken } from '../../services/api';
import types from '../types/userTypes';

export const updateUser = (data, form) => {
  return async (dispatch) => {
    const request1 = apiWithToken.put(`/users/${data.id}`, data);
    const request2 = apiWithToken.patch(`/users/upload/`, form);
    const responses = await axios.all([request1, request2]);
    console.log(responses);

    return dispatch({
      type: types.updateUser,
      payload: responses.data,
    });
  };
};

export const enviarMail = (input) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/api/v1/users/nodemailer',
      input
    );
    return dispatch({
      type: types.enviarMail,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
