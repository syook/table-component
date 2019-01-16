let baseURL;
let Env = 'local';

if (Env === 'local') {
  baseURL = 'http://localhost:5000';
}

export {baseURL}
