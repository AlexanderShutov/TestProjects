// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import { getEntity } from '../api';

type TestButtonProps = {
  text: string
};

@autobind
export default class TestButton extends React.Component {
  props: TestButtonProps;

  async handleClick(): Promise<void> {
    try {
      const entity = await getEntity();
      alert(`Entity loaded: ${entity.Name}`);
    }
    catch (error) {
      alert(error.message);
    }
  }

  render(): React.Element<any> {
    return (
      <input type='button'
        value={this.props.text}
        onClick={this.handleClick} />
    );
  }
}
