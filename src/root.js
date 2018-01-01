import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {renderRoutes} from 'react-router-config';

export default class Root extends Component {
  render() {
    const {store, history, routes} = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter key={module.hot && new Date()} history={history}>
          {renderRoutes(routes)
}
        </ConnectedRouter>
      </Provider >
    );
  }
}
