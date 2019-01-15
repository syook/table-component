import { BrowserRouter, Route } from 'react-router-dom';
import { persistor, store } from './store';

import App from './App';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import React from 'react';

const AppContainer = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <Route path="/" component={App} />
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default AppContainer;
