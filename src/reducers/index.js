import { combineReducers } from 'redux';
import { categories } from '../containers/categories/reducer';

export default combineReducers(
  Object.assign(
    {categories},
  )
);
