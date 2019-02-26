// @flow

import React from 'react';
import { render } from 'react-dom';
import TestButton from './test-button';

require('./styles/app.css');

render(
  <TestButton text='Click me' />,
  document.getElementById('root')
);
