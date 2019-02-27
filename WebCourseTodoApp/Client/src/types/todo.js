// @flow

export type Todo = {
  id: integer;
  text: string,
  completed: boolean;
  highImportance: boolean;
};

export type TodoListItemProps = {
  todo: Todo;
};
