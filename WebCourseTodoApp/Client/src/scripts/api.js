// @flow

import type { Todo, TodoArray } from './types';
import { SORTORDER_BY_IMPORTANCE, SORTORDER_BY_COMPLETED } from './consts';

export default class TodoApi {
  todos: TodoArray;

  /* Добавление */
  async _post(text: string, highImportance: boolean): Promise<number> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ text: text, highImportance: highImportance }),
    };

    const response = await fetch('api/todo', options);
    if (response.status === 200) {
      let responseText = await response.text();
      return Number(responseText);
    }
    throw new Error(`Error: ${response.statusText}`);
  }

  async addTodo(text: string, highImportance: boolean): Promise<void> {
    let newId = await this._post(text, highImportance);

    this.todos.push({
      id: newId,
      text: text,
      highImportance: highImportance,
      completed: false,
    });
  }

  /* Изменение состояния */
  async _put(id: number, text: string, highImportance: boolean, completed: boolean): Promise<boolean> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({ id: id, text: text, highImportance: highImportance, completed: completed })
    };

    const response = await fetch('api/todo', options);
    if (response.status === 200) {
      let responseText = await response.text();
      return Boolean(responseText);
    }
    throw new Error(`Error: ${response.statusText}`);
  }

  async reverseState(id: number): Promise<boolean> {
    let index = this.todos.findIndex(t => t.id === id);
    if (index > -1) {
      const todo = this.todos[index];

      if (await this._put(todo.id, todo.text, todo.highImportance, !todo.completed)) {
        this.todos[index].completed = !todo.completed;
        return true;
      }
    }
    return false;
  }

  async put(todo: Todo): Promise<void> {
    await this._put(todo.id, todo.text, todo.highImportance, todo.completed);
  }

  /* Удаление */
  async _delete(id: number): Promise<boolean> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    };

    const response = await fetch('api/todo?id=' + id, options);
    if (response.status === 200) {
      let responseText = await (response.text());
      return Boolean(responseText);
    }
    throw new Error(`Error: ${response.statusText}`);
  }

  async delete(id: number): Promise<boolean> {
    if (await this._delete(id)) {
      this.todos = this.todos.filter(t => t.id !== id);
      return true;
    }
    return false;
  }

  /* Список */

  async _getAllFromServer(): Promise<TodoArray> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET'
    };
    const response = await fetch('api/todo', options);
    if (response.status === 200) {
      return await response.json();
    }
    throw new Error(`Error: ${response.statusText}`);
  }

  async getAll(sortOrder: string, fromServer: ?boolean): Promise<TodoArray> {
    if (fromServer != null && fromServer)
      this.todos = await this._getAllFromServer();

    if (sortOrder === SORTORDER_BY_IMPORTANCE) {
      this.todos.sort(_sortByImportance);
    }
    else
      if (sortOrder === SORTORDER_BY_COMPLETED)
        this.todos.sort(_sortByCompleted);
      else
        this.todos.sort((a, b) => b.id - a.id);

    return await this.todos;
  }

  /* Одна запись */

  async get(id: number): Promise<Todo> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    };

    const response = await fetch('api/todo/' + id, options);
    if (response.status === 200) {
      return await response.json();
    }
    throw new Error(`Error: ${response.statusText}`);
  }
}

function _sortByImportance(a: Todo, b: Todo): number {
  if (a.highImportance && !b.highImportance)
    return -1;
  else
    if (!a.highImportance && b.highImportance)
      return 1;
    else
      return b.id - a.id;
}

function _sortByCompleted(a: Todo, b: Todo): number {
  if (a.completed && !b.completed)
    return 1;
  else
    if (!a.completed && b.completed)
      return -1;
    else
      return b.id - a.id;
}





