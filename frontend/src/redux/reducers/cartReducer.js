import types from '../types/cartTypes';

const initialState = {
  cart: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.updateCart:
      return { ...state, cart: payload };
    default:
      return state;
  }
};
