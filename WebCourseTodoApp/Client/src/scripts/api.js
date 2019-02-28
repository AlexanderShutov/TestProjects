// @flow

import { TodoArray, SORTORDER_BY_IMPORTANCE, SORTORDER_BY_COMPLETED } from './types';

export default class TodoApi {
  /* TODO надо получать его с сервера */
  maxid: number;
  todos: TodoArray;

  constructor() {
    this.todos = [
      {
        id: 1,
        text: 'посетить стоматолога',
        highImportance: true,
      },
      {
        id: 2,
        text: 'сделать прививки',
        highImportance: true,
        completed: true,
      },
      {
        id: 3,
        text: 'определиться со стоянкой для машины',
      },
      {
        id: 4,
        text: 'продумать маршрут в аэропорт',
        highImportance: false,
        completed: true,
      },
      {
        id: 5,
        text: 'оплатить счета(телефон, коммуналка)',
        highImportance: true,
      }
    ];
  /*  пополнить карты
    взять powerbank
    собрать чемодан
    сделать копии документов
    в течение недели избавиться от продуктов в холодильнике
    купить солнцезащитные кремы
    собрать аптечку в дорогу
    проверить, не сдвинулся ли вылет
  */
    this.maxid = this.todos.length;
  }

  AddTodo(text: string, highImportance: boolean) {
    this.maxid++;

    this.todos.push({
      id: this.maxid,
      text: text,
      highImportance: highImportance,
      completed: false,
    });
  }

  DeleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  ReverseTodoState(id: number) {
    let index = this.todos.findIndex(t => t.id === id);
    if (index > -1)
      this.todos[index].completed = !this.todos[index].completed;
  }

  async GetTodos(sortOrder: string): Promise<TodoArray> {
    //let x = await getEntity();
    //console.log(x);
    if (sortOrder === SORTORDER_BY_IMPORTANCE) {
      this.todos.sort(SortByImportance);
    }
    else
      if (sortOrder === SORTORDER_BY_COMPLETED)
        this.todos.sort(SortByCompleted);
      else
        this.todos.sort((a, b) => b.id - a.id);

    return await this.todos;
  }
}

function SortByImportance(a: Todo, b: Todo): number {
  if (a.highImportance && !b.highImportance)
    return -1;
  else
    if (!a.highImportance && b.highImportance)
      return 1;
    else
      return b.id - a.id;
}

function SortByCompleted(a: Todo, b: Todo): number {
  if (a.completed && !b.completed)
    return 1;
  else
    if (!a.completed && b.completed)
      return -1;
    else
      return b.id - a.id;
}

type Entity = {
  Id: number,
  Name: string,
};

async function getEntity(): Promise<Entity> {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  };
  const response = await fetch('api/test', options);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(`Error: ${response.statusText}`);
}




