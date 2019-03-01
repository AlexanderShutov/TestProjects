// @flow

import React from 'react';
import type { Todo } from './types';
import { TODO, FROM_LIST } from './consts';

type TodoListItemProps = {
  todo: Todo,
  onReverseTodoState: (id: number) => Promise<void>,
  onDeleteTodo: (id: number) => Promise<void>,
};

const TodoListItem = (props: TodoListItemProps): React.Element<any> => {
  const { id, text, completed, highImportance } = props.todo;

  const imgClassName = 'todo-list-item__importance' + (highImportance ? '' : ' todo-list-item__importance_hidden');
  const labelClassName = 'todo-list-item__text' +
    (completed ? ' todo-list-item__text-strike-out todo-list-item__text-grayed' : '') +
    (!completed && highImportance ? ' todo-list-item__text-red' : '');
  const firstButtonText = (completed ? 'В работу' : 'Выполнить');

  return (
    <div className="todo-list-item">
      <img src="../images/highimportance_32.svg" className={imgClassName} />
      <a className={labelClassName} href={`#${TODO}/${id}${FROM_LIST}`}>{text}</a>
      <button className="todo-list-item__modify" onClick={() => props.onReverseTodoState(id)}>{firstButtonText}</button>
      <button className="todo-list-item__modify" onClick={() => props.onDeleteTodo(id)}>Удалить</button>
    </div>
  );
};

export default TodoListItem;
