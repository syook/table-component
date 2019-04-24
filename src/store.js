import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import localforage from 'localforage';
import reducer from './reducers';
import thunk from 'redux-thunk';

let middleware = [thunk];
// Keep it off by default
// if (process.env.NODE_ENV !== 'production') {
//   const createLogger = require('redux-logger').createLogger;
//   middleware = [...middleware, createLogger()];
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = composeEnhancers(applyMiddleware(...middleware))(createStore);

const config = {
  key: 'root',
  storage: localforage,
};

const combinedReducer = persistReducer(config, reducer);
const store = configureStore(combinedReducer);
const persistor = persistStore(store);

export { persistor, store };
