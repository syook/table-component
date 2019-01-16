/**
 * Function creates getApi, postApi methods
 * @param {function} apiErrorHandler Which can receive
 * api-response and any other parameter passed
 * to getApi/postApi
 * @param {header} defaultHeaders headers to be send with each request
 * @return {getApi, postApi}
 */
export default function fetchAPI(apiErrorHandler, requestIntercepter) {
  /**
   * This is the getApi function
   * @param {string} url should be a string and complete
   *  with protocol and domain name
   * @param {object} requestConfig This can be a
   * request config object
   * @returns {promise} returns a promise
   */

  async function getApi(url, requestConfig, ...args) {
    if (process.env.NODE_ENV === 'production' && !window.navigator.onLine) {
      throw new Error('Currently you are offline');
    }
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    });

    requestIntercepter(url, { headers });
    const defaultConfig = { method: 'GET', headers };

    try {
      url = new URL(url);
    } catch (error) {
      throw new Error('URL provided is not valid');
    }
    requestConfig = Object.assign(defaultConfig, requestConfig);

    try {
      const response = await fetch(url, requestConfig);
      /**
       * any response would mean server is online
       */
      return handleApiResponse(response, ...args);
    } catch (error) {
      /**
       * handle offline error
       */
      console.error('Fetch Error. Check url or internet connection', error);
      throw error;
    }
  }

  /**
   * This is the postApi function
   * @param {string} url URL should be a string and complete
   *  with protocol and domain name
   * @param {string | object} requestConfig This can be
   * 1.string passed to body of request
   * 2.Object Stringified and Passed to request-body
   * 3.Object request config
   * @returns {promise} returns a promise
   * @example
   * postApi('http://localhost:3001/api/login',
   *   {user: {email: '***'}}
   * )
   * postApi('http://localhost:3001/api/login',
   *   "{'user': {'email': '***'}}"
   * )
   * postApi('http://localhost:3001/api/login',
   *   {body: {user: {email: '***'}}}
   * )
   *
   */
  async function postApi(url, requestConfig = {}, ...args) {
    const response = await getApi(
      url,
      createPostAPIConfig(requestConfig),
      ...args
    );
    return response;
  }

  // helper function to create postApi request config
  function createPostAPIConfig(requestConfig) {
    let defaultConfig = {
      method: 'POST',
    };
    if (requestConfig.method) defaultConfig.method = requestConfig.method;
    if (!requestConfig) throw new Error('POST request without any data');
    if (typeof requestConfig === 'string') {
      defaultConfig.body = requestConfig;
      return defaultConfig;
    }
    if (
      !requestConfig.body &&
      !requestConfig.method &&
      !requestConfig.headers
    ) {
      defaultConfig.body = JSON.stringify(requestConfig);
      return defaultConfig;
    }
    let body = requestConfig.body;
    if (typeof body === 'string') {
      // Check if string is a valid JSON
      JSON.parse(body);
    } else {
      requestConfig.body = JSON.stringify(body);
    }
    defaultConfig = Object.assign(defaultConfig, requestConfig);
    return defaultConfig;
  }
  /**
   * This is a generic handler for api response
   * It will handle various common error like
   * 400, 401, 403
   * @param {promise} response API response
   * @returns {promise} Either the API response
   * or custom object with error code, message
   * and status
   * {
   *    message: 'something failed,
   *    status: 'failure'
   *    errorcode: 403
   * }
   */
  async function handleApiResponse(response, ...args) {
    if (response === null || response === undefined) {
      return apiErrorHandler(...args);
    }

    if (response.ok) {
      return response.json();
    }

    let _response = await response.json();
    _response.status = response.status;
    return apiErrorHandler(_response, ...args);
  }
  return { getApi, postApi, handleApiResponse };
}
