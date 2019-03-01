// @flow

import React from 'react';
import { hashHistory } from 'react-router';
import { autobind } from 'core-decorators';
import Api from './api';
import type { Todo } from './types';
import '../styles/app.css';

type TodoCardProps = {
  id: number,
  fromList: boolean,
};

type TodoCardState = {
  todo: ?Todo,
};
@autobind

export default class TodoCard extends React.Component {
  api: Api;
  props: TodoCardProps;
  state: TodoCardState;
  todoText: any;
  todoHighImportance: any;
  todoCompleted: any;

  constructor() {
    super();

    this.api = new Api();
    this.state = { todo: null };
  }

  componentDidMount() {
    this.load(this.props.id);
  }

  componentWillReceiveProps(nextProps: TodoCardProps) {
    if (this.props.id !== nextProps.id)
      this.load(nextProps.id);
  }

  componentDidUpdate() {
    if (this.state.todo != null) {
      this.todoText.focus();
    }
  }

  async load(id: number): Promise<void> {
    this.setState({ todo: await this.api.get(id) });
  }

  async save(): Promise<void> {
    const todo = this.state.todo;

    if (todo != null) {
      await this.api.put({
        id: todo.id, text: this.todoText.value,
        highImportance: this.todoHighImportance.checked, completed: this.todoCompleted.checked
      });

      this.goBack();
    }
  }

  goBack() {
    if (this.props.fromList)
      hashHistory.goBack();
    else
      document.location.href = '';
  }

  render(): React.Element<any> {
    let text = '';
    let highImportance = false;
    let completed = false;
    let hasTodo = false;

    const todo = this.state.todo;
    if (todo != null) {
      text = todo.text;
      highImportance = todo.highImportance;
      completed = todo.completed;
      hasTodo = true;
    }

    return (
      <div className="page">
        <div className="todo-card__header">
          <div className="todo-card__header-pointer"onClick={this.goBack}>Вернуться в список</div>
        </div>
        {hasTodo &&
          <div className="todo-card__content">
            <label> Текст задачи:</label>
            <div className="todo-card__content2">
              <input type="text" className="todo-card__text" ref={node => this.todoText = node} defaultValue={text} />

              <label className="todo-card__item" >
                <input type="checkbox" ref={node => this.todoHighImportance = node} defaultChecked={highImportance} />
                Важная задача
              </label>

              <label className="todo-card__item">
                <input type="checkbox" ref={node => this.todoCompleted = node} defaultChecked={completed} />
                Выполнена
              </label>

              <button className="todo-card__save" onClick={this.save}>Сохранить</button>
            </div>
          </div>
        }
        {!hasTodo &&
          <div className="todo-card__content" />
        }
      </div>
    );
  }
}