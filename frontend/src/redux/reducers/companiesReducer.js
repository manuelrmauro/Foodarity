import types from '../types/companiesTypes';

const initialState = {
  comerce: [],
  ongs: [],
  companies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getCompanies:
      return {
        ...state,
        comerce: action.payload,
        companies: action.payload,
      };
    case types.registerComerce:
      return {
        ...state,
        comerce: action.payload,
      };
    case types.getOngs:
      return {
        ...state,
        ongs: action.payload,
      };

    default:
      return state;
  }
};
