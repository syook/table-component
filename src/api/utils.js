import HTTPError from './HTTPError';
// import { bugsnagClient } from '../config/bugsnag';
// import debounce from 'lodash/debounce';
import fetchAPI from './fetchApi';
// import { setAlert } from '../actions/alert';
// import { setUserSession } from '../actions/authentication';
import { store } from '../store';

// const _setAlert = debounce(
//   (apiResponse, userMessage) =>
//     store.dispatch(
//       setAlert({
//         type: 'Error',
//         message: userMessage.concat(
//           `${
//             apiResponse.system_message && +apiResponse.status < 499
//               ? `. ${apiResponse.system_message}`
//               : ''
//           }`
//         ),
//       })
//     ),
//   300
// );

const apiErrorHandler = function(apiResponse) {
  let defaultError = new HTTPError(apiResponse);
  const errorHandler = {
    400: response => {
      return {
        user_message: 'Bad Request',
        ...defaultError,
      };
    },
    401: response => {
      // store.dispatch(setUserSession({}));
      return defaultError;
    },
    403: response => ({
      user_message: 'You are not authorized for requested resource',
      ...defaultError,
    }),
    404: response => ({
      user_message: 'Url/Record not found',
      ...defaultError,
    }),
    422: response => ({
      user_message: `Sorry, we couldn't process your request`,
      ...defaultError,
    }),
    500: response => ({
      user_message: `Sorry, we couldn't process your request`,
      ...defaultError,
    }),
    502: response => ({
      user_message: 'We are unable to reach our server.',
      ...defaultError,
    }),
    503: response => ({
      user_message: 'Service is currently unavailable',
      ...defaultError,
    }),
    504: response => ({
      user_message: 'Server is taking longer than expected',
      ...defaultError,
    }),
  };
  /**
   * don't snag these error response
   */
  if (499 < +apiResponse.status && !apiResponse.hasOwnProperty('success')) {
    // bugsnagClient.notify({
    //   name: 'API Error',
    //   message: apiResponse.user_message || apiResponse,
    // });
  }
  let userMessage = apiResponse.user_message || apiResponse.message;
  if (typeof userMessage !== 'string') {
    userMessage = 'Something went wrong';
  }

  // _setAlert(apiResponse, userMessage);

  if (apiResponse.status) {
    throw errorHandler[apiResponse.status](apiResponse.message);
  }
  throw errorHandler[500](apiResponse.message);
};

function requestIntercepter(url, config) {
  // Avoid access store directly. This is an exception
  var userSession = (store.getState().userSession||{}).token || '';
  config.headers.append('Authorization', `JWT ${userSession}`);
}

const { getApi, postApi, handleApiResponse } = fetchAPI(
  apiErrorHandler,
  requestIntercepter
);

export { getApi, postApi, handleApiResponse };
