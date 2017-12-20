import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route } from 'react-router';
import reducers from './shared/reducers';
import App from './shared/App';
import About from './shared/About';
import routes from './shared/routes';

const history = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(routerMiddleware(history)));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact name="index" path="/" component={App} />
        <Route path="/about" component={About} />
      </div>
    </ConnectedRouter>
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
