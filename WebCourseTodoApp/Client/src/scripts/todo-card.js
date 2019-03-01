// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import '../styles/app.css';

type TodoCardProps = {
  id: number
};

@autobind

export default class TodoCard extends React.Component {
  props: TodoCardProps;

  render(): React.Element<any> {
    return (
      <div className="todo-card">
        <div><a>Вернуться в список</a></div>
      </div>
    );
  }
}
