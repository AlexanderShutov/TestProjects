// @flow

export type Todo = {
  id: number,
  text: string,
  completed: boolean,
  highImportance: boolean,
};

export type TodoArray = Array<Todo>;