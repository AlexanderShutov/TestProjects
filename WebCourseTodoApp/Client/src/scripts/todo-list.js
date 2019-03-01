// @flow

import React from 'react';
import type { TodoArray } from './types';
import TodoListItem from './todo-list-item';

type TodoListProps = {
  todos: TodoArray,
  onReverseTodoState: (id: number) => void,
  onDeleteTodo: (id: number) => void,
};

const TodoList = (props: TodoListProps): React.ReactElement<any> => {
  const todos = props.todos;
  if (todos !== null && todos.length > 0) {
    return (
      <div className="todo-list">
        {
          todos.map((todo) => {
            return (
              <TodoListItem key={todo.id} todo={todo} onDeleteTodo={props.onDeleteTodo} onReverseTodoState={props.onReverseTodoState} />
            );
          })
        }
      </div>
    );
  }
  else {
    return (<div className="todo-list todo-list_empty">Список задач пуст</div>);
  }
};

export default TodoList;