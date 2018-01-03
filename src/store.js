import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import routerReducer from './routing';
import reducers from './reducers';

export default function configureStore(history, initialState = {}) {
  const middlewares = [routerMiddleware(history)];
  // TODO: check if we have production enviroment - don't connect enhancers
  const composeEnhancers =
    (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators,
        // serialize...
      })) ||
    compose;
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    fromJS(initialState),
    enhancer
  );

  // TODO: createNextReducer should create all reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const createNextReducer = require('./reducers');
      const nextReducer = createNextReducer();

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
