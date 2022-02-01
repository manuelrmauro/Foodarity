import { combineReducers } from 'redux';

import { uiReducer } from './ui';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  user: userReducer,
});
