import { types } from '../types/userTypes';

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.saveUserProfile:
      return {
        ...state,
        ...action.payload,
      };
    case types.removeUserProfile:
      return initialState;

    default:
      return state;
  }
};
