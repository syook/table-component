/**
 * Constructor for HTTP error
 * @param {*} err API response with message
 * @param {*} args other orguments
 * return new HTTPError object
 */
export default function HTTPError(err, ...args) {
  Error.call(this, err.message || err);
  Object.assign(this, err);
}

HTTPError.prototype = Object.create(Error.prototype);
HTTPError.prototype.constructor = HTTPError;
