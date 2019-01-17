import { combineReducers } from 'redux';
import { categories } from '../containers/categories/reducer';
import { menuItems } from '../containers/menuItems/reducer';

export default combineReducers(
  Object.assign(
    {categories},
    {menuItems}
  )
);
