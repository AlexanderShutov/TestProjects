// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import type { Todo, TodoListItemProps } from '../types/todo';


@autobind

export class TodoListItem extends React.Component {
  props: TodoListItemProps;

  async handleClick(): Promise<void> {
    try {
      // const entity = await getEntity();
      // alert(`Entity loaded: ${entity.Name}`);
      alert('123');
    }
    catch (error) {
      alert(error.message);
    }
  }

  render(): React.Element<any> {
    const imgClassName = 'todo-list-item__importance' + (this.props.todo.highImportance ? '' : ' todo-list-item__importance_hidden');
    const labelClassName = 'todo-list-item__text' +
      (this.props.todo.completed ? ' todo-list-item__text-strike-out' : '') +
      (!this.props.todo.completed && this.props.todo.highImportance ? ' todo-list-item__text-red' : '');
    const firstButtonText = (this.props.todo.completed ? 'В работу' : 'Выполнить');

    return (
      <div className="todo-list-item">
        <img src="../images/highimportance_32.svg" className={imgClassName} />
        <label className={labelClassName}>{this.props.todo.text}</label>
        <button className="todo-list-item__modify" onClick={this.handleClick}>{firstButtonText}</button>
        <button className="todo-list-item__modify" onClick={this.handleClick}>Удалить</button>
      </div>
    );
  }
}