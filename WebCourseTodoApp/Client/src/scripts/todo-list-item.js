// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import { Todo } from './types';

type TodoListItemProps = {
  todo: Todo,
};

@autobind

export class TodoListItem extends React.Component<TodoListItemProps> {
  props: TodoListItemProps;

/*  async handleClick(): Promise<void> {
    try {
      // const entity = await getEntity();
      // alert(`Entity loaded: ${entity.Name}`);
      alert('123');
    }
    catch (error) {
      console.log(error.message);
    }
  }

  async handleChangeState(): Promise<void> {
    try {
      this.setState({ completed: !this.state.completed });
    }
    catch (error) {
      console.log(error.message);
    }
  }*/

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
        <button className="todo-list-item__modify" onClick={this.handleChangeState}>{firstButtonText}</button>
        <button className="todo-list-item__modify" onClick={() => this.props.onDeleteTodo(id)}>Удалить</button>
      </div>
    );
  }
}