// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import TestButton from './test-button';
import NewTodo from './new-todo';
import '../styles/app.css';

@autobind
export default class Explorer extends React.Component {

  render(): React.Element<any> {
    return (
      <div className="explorer">
        <NewTodo />
        <div className="explorer__content">
          <div className="explorer__todo-list">
            <div className="todo-list-item">Todo 1</div>
            <div className="todo-list-item">Todo 2</div>
            <div className="todo-list-item">Todo 3</div>
          </div>
          <div className="list-sort-settings">
            <div className="list-sort-settings__title">Сортировать</div>
            <div className="list-sort-settings__item">По важности</div>
            <div className="list-sort-settings__item">По выполненности</div>
          </div>
        </div>
        <TestButton text="!!! test button!!!" />
      </div>
    );
  }
}
