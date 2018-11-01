import React, { Component } from 'react';

import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import KanbanApp from './components/KanbanApp';
import KanbanBoard from './components/KanbanBoard';
import NewCard from './nestedComponents/NewCard';

export default class App extends Component {
  render() {
    return(
      <Router history={createBrowserHistory()}>
        <Route component={KanbanApp}>
          <Route path="/" component={KanbanBoard}>
            <Route path="new" component={NewCard} />
          </Route>
        </Route>
      </Router>
    );
  };
};
