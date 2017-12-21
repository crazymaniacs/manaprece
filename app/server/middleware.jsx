import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';

import routes from '../shared/routes';
import reducers from '../shared/reducers';

const store = createStore(reducers);

export default (req, res) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route }) => {
    const { fetchData } = route.component;
    return fetchData instanceof Function
      ? fetchData(store)
      : Promise.resolve(null);
  });
  return Promise.all(promises).then((data) => {
    const context = {};
    const content = renderToString(<Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>);
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }
    res.render('index', { title: 'Express', data: store.getState(), content });
  });
};
