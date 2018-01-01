import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import {createMemoryHistory, createLocation} from 'history';
import {ConnectedRouter} from 'react-router-redux';

import routes from '../src/routes';
import reducers from '../src/reducers';
import configureStore from '../src/store';
import Html from './Html';

// example for this shit you can find in this miserable place:
// https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-
// w ith-router-v4-and-redux/

export default function createSSR(assets) {
  return (req, res) => {
    const history = createMemoryHistory();
    const location = createLocation(req.url);
    history.push(location);
    const store = configureStore(history);

    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route}) => {
      let fetchData = route.component.fetchData;
      return fetchData instanceof Function
        ? fetchData(store)
        : Promise.resolve(null)
    });
    return Promise
      .all(promises)
      .then((data) => {
        const context = {};
        const component = (
          <Provider store={store}>
            <ConnectedRouter history={history} context={context}>
              {renderRoutes(routes)}
            </ConnectedRouter>
          </Provider>
        );

        const content = renderToString(<Html {...{assets, store, component, context}}/>);
        if (context.status === 404) {
          res.status(404);
        }
        if (context.status === 302) {
          return res.redirect(302, context.url);
        }
        res.send(`<!doctype html>\n${content}`);
      });
  };
};
