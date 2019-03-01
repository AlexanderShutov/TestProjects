// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import Api from './api';
import { TodoArray, SORTORDER_NONE, SORTORDER_BY_IMPORTANCE, SORTORDER_BY_COMPLETED } from './types';
import NewTodo from './new-todo';
import TodoList from './todo-list';
import '../styles/app.css';

type ExplorerProps = {
  sortOrder: string,
};

type ExplorerStateProps = {
  todos: TodoArray,
  sortOrder: string,
};

@autobind

export default class Explorer extends React.Component {
  api: Api;
  props: ExplorerProps;
  state: ExplorerStateProps;

  constructor() {
    super();
    this.api = new Api();
    this.state = { todos: null, sortOrder: SORTORDER_NONE };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.refreshList(this.props.sortOrder, true);
  }

  componentDidUpdate() {
    if (this.state.sortOrder !== this.props.sortOrder) {
      this.refreshList(this.props.sortOrder);
    }
  }

  async refreshList(newSortOrder: ?string, fromServer: ?boolean): Promise<void> {
    if (newSortOrder == null)
      this.setState({ todos: await this.api.getAll(this.state.sortOrder, fromServer) });
    else
      this.setState({ todos: await this.api.getAll(newSortOrder, fromServer), sortOrder: newSortOrder });
  }

  async handleAddTodo(text: string, highImportance: boolean): Promise<void> {
    await this.api.addTodo(text, highImportance);
    this.refreshList();
  }

  async handleDeleteTodo(id: number): Promise<void> {
    await this.api.delete(id);
    this.refreshList();
  }

  async handleReverseTodoState(id: number): Promise<void> {
    await this.api.reverseState(id);
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
            <div><a className="list-sort-settings__item" href={'#' + SORTORDER_BY_IMPORTANCE}>{sortOrder === SORTORDER_BY_IMPORTANCE ? '✓' : ' '} По важности</a></div>
            <div><a className="list-sort-settings__item" href={'#' + SORTORDER_BY_COMPLETED}>{sortOrder === SORTORDER_BY_COMPLETED ? '✓' : ' '} По выполненности</a></div>
          </div>
        </div>
      </div>
    );
  }
}
