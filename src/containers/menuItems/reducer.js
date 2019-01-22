import { menuItemsUrl } from '../../config/api';
import { getApi } from '../../api/utils';
import createReducer from '../../lib/createReducer';

let actions = {};
actions.SET_MENU_ITEMS = '/containers/menuItems/SET_MENU_ITEMS'

export function setMenuItems(payload){
  return {
    type: actions.SET_MENU_ITEMS,
    payload
  }
}

export function fetchMenuItems() {
  return async function(dispatch) {
    try {
      let response = await getApi(menuItemsUrl)
      dispatch(setMenuItems(response.data))
    }
    catch (error) {
      console.error(error);
    }
  }
}

export function deleteMenuItems() {
  return async function(dispatch) {
    try {
      let response = await getApi(`${menuItemsUrl}/deleteAll`)
      dispatch(setMenuItems(response.data))
    }
    catch (error) {
      console.error(error);
    }
  }
}

// reducer
export const menuItems = createReducer([], {
  [actions.SET_MENU_ITEMS](state, { payload }) {
    return payload;
  },
});
