import { combineReducers } from 'redux';
import * as scanResultReducer from './scanResultReducer';

export default combineReducers(Object.assign(
  scanResultReducer,
));
