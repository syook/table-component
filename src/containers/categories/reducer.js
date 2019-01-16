import { categoriesUrl } from '../../config/api';
import { getApi } from '../../api/utils';
import createReducer from '../../lib/createReducer';

let actions = {};
actions.SET_CATEGORIES = '/containers/categories/SET_CATEGORIES'

export function setCategories(payload){
  return {
    type: actions.SET_CATEGORIES,
    payload
  }
}

export function fetchCategories() {
  return async function(dispatch) {
    try {
      let response = await getApi(categoriesUrl)
      dispatch(setCategories(response.data))
    }
    catch (error) {
      console.error(error);
    }
  }
}

// reducer
export const categories = createReducer([], {
  [actions.SET_CATEGORIES](state, { payload }) {
    return payload;
  },
});
