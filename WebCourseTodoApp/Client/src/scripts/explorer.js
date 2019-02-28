// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import Api from './api';
import { TodoArray, SORTORDER_NONE, SORTORDER_BY_IMPORTANCE, SORTORDER_BY_COMPLETED } from './types';
import NewTodo from './new-todo';
import TodoList from './todo-list';
import '../styles/app.css';

type ExplorerStateProps = {
  todos: TodoArray,
  sortOrder: string,
};

@autobind

export default class Explorer extends React.Component {
  api: Api;
  state: ExplorerStateProps;

  constructor() {
    super();
    this.api = new Api();
    this.state = { todos: null, sortOrder: SORTORDER_NONE };
  }

  componentDidMount() {
    /*TODO*/
    // eslint-disable-next-line react/no-did-mount-set-state
    this.refreshList(SORTORDER_NONE);
  }

  refreshList(newSortOrder: ?string) {
    if (newSortOrder == null)
      this.setState({ todos: this.api.GetTodos(this.state.sortOrder) });
    else
      this.setState({ todos: this.api.GetTodos(newSortOrder), sortOrder: newSortOrder });
  }

  handleSortList(newSortOrder: string) {
    this.refreshList((this.state.sortOrder === newSortOrder) ? SORTORDER_NONE : newSortOrder);
  }

  handleAddTodo(text: string, highImportance: boolean) {
    this.api.AddTodo(text, highImportance);
    this.refreshList();
  }

  handleDeleteTodo(id: number) {
    this.api.DeleteTodo(id);
    this.refreshList();
  }

  handleReverseTodoState(id: number) {
    this.api.ReverseTodoState(id);
    this.refreshList();
  }

  render(): React.Element<any> {
    const { todos, sortOrder } = this.state;

    return (
      <div className="explorer">
        <NewTodo onAddTodo={this.handleAddTodo} />
        <div className="explorer__content">
          <TodoList todos={todos} onDeleteTodo={this.handleDeleteTodo} onReverseTodoState={this.handleReverseTodoState} />
          <div className="list-sort-settings">
            <div className="list-sort-settings__title">Сортировать</div>
            <div className="list-sort-settings__item" onClick={() => this.handleSortList(SORTORDER_BY_IMPORTANCE)}>{sortOrder === SORTORDER_BY_IMPORTANCE ? '✓' : ' '} По важности</div>
            <div className="list-sort-settings__item" onClick={() => this.handleSortList(SORTORDER_BY_COMPLETED)}>{sortOrder === SORTORDER_BY_COMPLETED ? '✓' : ' '} По выполненности</div>
          </div>
        </div>
      </div>
    );
  }
}
