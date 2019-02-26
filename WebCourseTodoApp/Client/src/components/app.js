// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import Explorer from './explorer.js';

@autobind
export default class App extends React.Component {

  render(): React.Element<any> {
    return (
      <Explorer />
    );
  }
}
