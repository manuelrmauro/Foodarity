import { types } from '../types/ui';

const initialState = {
  asidemenu: true,
  loading: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.toggleAsideMenu:
      return {
        ...state,
        asidemenu: action.payload,
      };
    case types.showLoading:
      return {
        ...state,
        loading: true,
      };
    case types.removeLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
