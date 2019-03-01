// @flow

export type Todo = {
  id: integer,
  text: string,
  completed: boolean,
  highImportance: boolean,
};

export type TodoArray = ?Array<Todo>;

export const SORTORDER_NONE = 'None';
export const SORTORDER_BY_IMPORTANCE = 'sort/importance';
export const SORTORDER_BY_COMPLETED = 'sort/completed';