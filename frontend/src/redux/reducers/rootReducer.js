import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import companiesReducer from './companiesReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  companies: companiesReducer,
  cart: cartReducer,
});
