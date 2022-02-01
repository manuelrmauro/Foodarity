import { types } from '../types/userTypes';

// export const startSaveUserProfile = (name,photo,socialPhoto) => {

// }

export const saveUserProfile = (user) => {
  return async (dispatch) => {
    dispatch({
      type: types.saveUserProfile,
      payload: user,
    });
  };
};

export const removeUserProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: types.removeUserProfile,
    });
  };
};
