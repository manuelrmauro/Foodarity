import types from '../types/userTypes';

const initialState = {
  user: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.registerLocal:
      return {
        user: action.payload,
      };
    case types.updateUser:
      return {
        user: action.payload,
      };
    case types.enviarMail:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
