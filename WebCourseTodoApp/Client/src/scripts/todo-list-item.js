// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import { Todo } from './types';

type TodoListItemProps = {
  todo: Todo,
  onReverseTodoState: (id: number) => void,
  onDeleteTodo: (id: number) => void,
};

@autobind

// eslint-disable-next-line react/prefer-stateless-function
export default class TodoListItem extends React.Component {
  props: TodoListItemProps;

  render(): React.Element<any> {
    const { id, text, completed, highImportance } = this.props.todo;

    const imgClassName = 'todo-list-item__importance' + (highImportance ? '' : ' todo-list-item__importance_hidden');
    const labelClassName = 'todo-list-item__text' +
      (completed ? ' todo-list-item__text-strike-out' : '') +
      (!completed && highImportance ? ' todo-list-item__text-red' : '');
    const firstButtonText = (completed ? 'В работу' : 'Выполнить');

    return (
      <div className="todo-list-item">
        <img src="../images/highimportance_32.svg" className={imgClassName} />
        <label className={labelClassName}>{id + text}</label>
        <button className="todo-list-item__modify" onClick={() => this.props.onReverseTodoState(id)}>{firstButtonText}</button>
        <button className="todo-list-item__modify" onClick={() => this.props.onDeleteTodo(id)}>Удалить</button>
      </div>
    );
  }
}


