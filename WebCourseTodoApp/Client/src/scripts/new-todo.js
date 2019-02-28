// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import '../styles/app.css';

@autobind
export default class NewTodo extends React.Component {

  componentDidMount() {
    this.newTodoText.focus();
  }

  render(): React.Element<any> {
    return (
      <div className="new-todo">
        <label className="new-todo__text-label">Текст новой задачи:</label>
        <input type="text" className="new-todo__text-input" ref={node => this.newTodoText = node} />
        <label className="new-todo__importance-text">
          <input type="checkbox" className="new-todo__importance" ref={node => this.newTodoHighImportance = node} />
          Задача важная
        </label>
        <button className="new-todo__add"
          onClick={() => this.props.onAddTodo(this.newTodoText.value, this.newTodoHighImportance.checked)}>Добавить</button>
      </div>
    );
  }
}
