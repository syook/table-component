import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './appContainer';
import * as serviceWorker from './serviceWorker';
import('semantic-ui-css/semantic.min.css');

ReactDOM.render(<AppContainer />, document.getElementById('root'));

serviceWorker.unregister();
