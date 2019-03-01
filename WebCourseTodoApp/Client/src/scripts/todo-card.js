// @flow

import React from 'react';
import { hashHistory } from 'react-router';
import { autobind } from 'core-decorators';
import Api from './api';
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
    if (this.state.todo !== null) {
      this.TodoText.focus();
    }
  }

  async load(id: number): Promise<void> {
    console.log('load ' + id);
    this.setState({ todo: await this.api.get(id) });
  }

  save() {
    alert('save');
    this.goBack();
  }

  goBack() {
    if (this.props.fromList)
      hashHistory.goBack();
    else
      document.location.href = '';
  }

  render(): React.Element<any> {
    const todo = this.state.todo;
    const hasTodo = (todo !== null);

    let text = '';
    let highImportance = false;
    let completed = false;

    if (hasTodo) {
      text = todo.text;
      highImportance = todo.highImportance;
      completed = todo.completed;
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
              <input type="text" className="todo-card__text" ref={node => this.TodoText = node} defaultValue={text} />

              <label className="todo-card__item" >
                <input type="checkbox" ref={node => this.TodoHighImportance = node} defaultChecked={highImportance} />
                Задача важная
              </label>

              <label className="todo-card__item">
                <input type="checkbox" ref={node => this.TodoCompleted = node} defaultChecked={completed} />
                Выполнена
              </label>

              <button className="todo-card__save" onClick={this.save}>Сохранить</button>
              {this.props.id}
              {this.props.fromList}
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


/*



  handleAddTodoClick() {
    if (this.newTodoText.value === '')
      this.newTodoText.focus();
    else
      this.props.onAddTodo(this.newTodoText.value, this.newTodoHighImportance.checked);
  }

  render(): React.Element<any> {
    return (
      <div className="new-todo">

        <input type="text" className="new-todo__text-input" ref={node => this.newTodoText = node} />
      </div>
    );
  }


*/