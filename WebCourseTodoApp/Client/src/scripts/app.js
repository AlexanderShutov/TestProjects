// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import Explorer from './explorer';
import TodoCard from './todo-card';
import { SORTORDER_NONE, SORTORDER_BY_IMPORTANCE, SORTORDER_BY_COMPLETED } from './types';

type AppState = {
  route: string
};

@autobind

export default class App extends React.Component {
  state: AppState;

  constructor() {
    super();
    this.state = { route: window.location.hash.substr(1) };
  }

  componentWillMount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange);
  }

  handleHashChange() {
    this.setState({ route: window.location.hash.substr(1) });
  }

  render(): React.Element<any> {
    const route = this.state.route;
    if (route.startsWith('todo') && route.length > 5) {
      let id = Number(route.substr(5, route.length - 5));
      if (id >> 0)
        return (<TodoCard id={id} />);
    }

    let sortOrder = SORTORDER_NONE;
    if (route === SORTORDER_BY_COMPLETED || route === SORTORDER_BY_IMPORTANCE)
      sortOrder = route;
    return (<Explorer sortOrder={sortOrder} />);
  }
}