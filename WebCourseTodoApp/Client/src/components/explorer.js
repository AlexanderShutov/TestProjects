// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import NewTodo from './new-todo';
import TodoList from './todo-list';
import '../styles/app.css';

@autobind

// eslint-disable-next-line react/prefer-stateless-function
export default class Explorer extends React.Component {

  render(): React.Element<any> {
    return (
      <div className="explorer">
        <NewTodo />
        <div className="explorer__content">
          <TodoList />
          <div className="list-sort-settings">
            <div className="list-sort-settings__title">Сортировать</div>
            <div className="list-sort-settings__item">По важности</div>
            <div className="list-sort-settings__item">По выполненности</div>
          </div>
        </div>
      </div>
    );
  }
}
