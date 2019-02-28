// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import type { TodoArray } from './types';
import { TodoListItem } from './todo-list-item';

type TodoListProps = {
  todos: TodoArray
};

@autobind

// eslint-disable-next-line react/prefer-stateless-function
export default class TodoList extends React.Component<TodoListProps> {
  props: TodoListProps;

  render(): React.Element<any> {
    const todos = this.props.todos;
    if (todos !== null && todos.length > 0) {
      return (
        <div className="todo-list">
          {
            todos.map((todo) => {
              return (
                <TodoListItem key={todo.id} todo={todo} onDeleteTodo={this.props.onDeleteTodo} />
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