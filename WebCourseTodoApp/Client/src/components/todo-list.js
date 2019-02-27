// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import { TodoListItem } from './todo-list-item';
import { GetTodos } from '../api';

@autobind

// eslint-disable-next-line react/prefer-stateless-function
export default class TodoList extends React.Component<> {
  render(): React.Element<any> {
    const todos = GetTodos();
    if (todos !== null) {
      return (
        <div className="todo-list">
          {
            todos.map((todo) => {
              return (
                <TodoListItem key={todo.id} todo={todo} />
              );
            })
          }
        </div>
      );
    }
    else {
      return (<div className="todo-list todo-list_empty">Добавьте новую задачу</div>);
    }
  }
}