// @flow

import React from 'react';
import { autobind } from 'core-decorators';
import Explorer from './explorer';
import TodoCard from './todo-card';
import { TODO, SORTORDER_NONE, SORTORDER_BY_IMPORTANCE, SORTORDER_BY_COMPLETED, FROM_LIST } from './consts';

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
    let route = this.state.route;

    if (route.startsWith(TODO) && route.length > TODO.length + 1) {
      const fromList = route.endsWith(FROM_LIST);
      if (fromList)
        route = route.substr(0, route.length - FROM_LIST.length);

      let id = Number(route.substr(TODO.length + 1, route.length - (TODO.length + 1)));
      if (id >> 0)
        return (<TodoCard id={id} fromList={fromList} />);
    }

    let sortOrder = SORTORDER_NONE;
    if (route === SORTORDER_BY_COMPLETED || route === SORTORDER_BY_IMPORTANCE)
      sortOrder = route;
    return (<Explorer sortOrder={sortOrder} />);
  }
}