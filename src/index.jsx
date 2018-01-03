import React from 'react';
import { hydrate } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import { fromJS } from 'immutable';

import routes from './routes';
import configureStore from './store';
import Root from './root';

// this is a client side - rearrange this file appropriately
const initialState = fromJS(window.__INITIAL_STATE__);
const store = configureStore(history, initialState);
const history = createHistory();

const render = (Component, routes) => {
  hydrate(
    <AppContainer>
      <Component {...{ store, history, routes }} />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root, routes);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept(['./root', './routes'], () => {
    render(Root, routes);
  });
}
