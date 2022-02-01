import { types } from '../types/ui';

export const toggleAsideMenu = (payload) => ({
  type: types.toggleAsideMenu,
  payload,
});

export const startLoading = () => ({
  type: types.showLoading,
});

export const finishLoading = () => ({
  type: types.removeLoading,
});
