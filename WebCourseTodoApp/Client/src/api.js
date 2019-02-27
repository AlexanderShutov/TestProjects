// @flow

import type { Entity } from './types/entity';
import type { Todo } from './types/todo';

export function GetTodos(): Array<Todo> {
  /*const initialTodoList = [
    {
      id: 1;
      text: 'посетить стоматолога',
      highImportance: true,
    },
    {
      id: 2;
      text: 'сделать прививки',
      highImportance: true,
      completed: true,
    },
    {
      id: 3;
      text: 'определиться со стоянкой для машины',
    },
    {
      id: 4;
      text: 'продумать маршрут в аэропорт',
      highImportance: false,
      completed: true,
    },
    {
      id: 5;
      text: 'оплатить счета(телефон, коммуналка)',
      highImportance: true,
    }
  ];
  */
  /*  пополнить карты
    взять powerbank
    собрать чемодан
    сделать копии документов
    в течение недели избавиться от продуктов в холодильнике
    купить солнцезащитные кремы
    собрать аптечку в дорогу
    проверить, не сдвинулся ли вылет
  */
  return null//initialTodoList;
}

export async function getEntity(): Promise<Entity> {
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




