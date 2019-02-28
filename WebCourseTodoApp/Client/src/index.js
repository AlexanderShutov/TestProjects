// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './scripts/app';

require('./styles/app.css');

render(
  <App />,
  document.getElementById('root')
);
