import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import reducers from './shared/reducers';
import routes from './shared/routes';

const history = createBrowserHistory();
const store = createStore(
  reducers,
  window.__INITIAL_STATE__,
  applyMiddleware(routerMiddleware(history))
);

render(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
  module.hot.accept('./shared/reducers', () => {
    /* eslint-disable global-require */
    store.replaceReducer(require('./shared/reducers').default);
    /* eslint-disable global-require */
  });
}
