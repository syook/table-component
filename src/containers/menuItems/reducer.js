import { menuItemsUrl } from '../../config/api';
import { getApi, postApi} from '../../api/utils';
import createReducer from '../../lib/createReducer';

let actions = {};
actions.SET_MENU_ITEMS = '/containers/menuItems/SET_MENU_ITEMS'
actions.DELETE_MENU_ITEM = '/containers/menuItems/DELETE_MENU_ITEM';
actions.DELETE_MENU_ITEMS = '/containers/menuItems/DELETE_MENU_ITEMS';

export function setMenuItems(payload){
  return {
    type: actions.SET_MENU_ITEMS,
    payload
  }
}

export function deleteMenuItemStore(payload) {
  return {
    type: actions.DELETE_MENU_ITEM,
    payload,
  };
}

export function deleteMenuItemsStore(payload) {
  return {
    type: actions.DELETE_MENU_ITEMS,
    payload,
  };
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

export function deleteMenuItems(ids) {
  return async function(dispatch) {
    try {
      let response = await postApi(`${menuItemsUrl}/deleteAll`, {
        ids: ids
      })

      dispatch(deleteMenuItemsStore(response.data))
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
  [actions.DELETE_MENU_ITEMS](state, {payload}) {
    let newState = [...state];
    payload.forEach(itemId => {
      const indexOfItemToDelete = state.findIndex(m => {
        return m._id === itemId;
      });
      if (indexOfItemToDelete !== -1) {
        newState.splice(indexOfItemToDelete, 1);
      }
    });
    return newState;
  },
});
