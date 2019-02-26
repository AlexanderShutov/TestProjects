// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

require('./styles/app.css');

render(
  <App />,
  document.getElementById('root')
);
