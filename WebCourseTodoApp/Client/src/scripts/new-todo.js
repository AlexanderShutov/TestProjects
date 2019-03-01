// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import '../styles/app.css';

type NewTodoProps = {
  onAddTodo: (text: string, highImportance: boolean) => Promise<void>,
};

@autobind

export default class NewTodo extends React.Component {
  props: NewTodoProps;
  newTodoText: any;
  newTodoHighImportance: any;

  componentDidMount() {
    this.newTodoText.focus();
  }

  handleAddTodoClick() {
    if (this.newTodoText.value === '')
      this.newTodoText.focus();
    else
      this.props.onAddTodo(this.newTodoText.value, this.newTodoHighImportance.checked);
  }

  render(): React.Element<any> {
    return (
      <div className="new-todo">
        <label className="new-todo__text-label">Текст новой задачи:</label>
        <input type="text" className="new-todo__text-input" ref={node => this.newTodoText = node} />
        <label className="new-todo__importance-text">
          <input type="checkbox" className="new-todo__importance" ref={node => this.newTodoHighImportance = node} />
          Важная задача
        </label>
        <button className="new-todo__add"
          onClick={this.handleAddTodoClick}>Добавить</button>
      </div>
    );
  }
}
