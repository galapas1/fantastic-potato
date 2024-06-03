
/* eslint-disable no-unused-vars */

import React from 'react';
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router';
import { getRoutes } from './routes';
import configureStore from './store.js';
import Root from './root'

const store = configureStore();

render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('app')
)

/* */
