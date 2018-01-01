import React from 'react';
import {hydrate} from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import {fromJS} from 'immutable';

import reducers from './reducers';
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
				<Component {...{store, history, routes}}/>
		</AppContainer>, document.getElementById('root'))
}

render(Root, routes);

// Webpack Hot Module Replacement API
if (module.hot) {
		module
				.hot
				.accept([
						'./root', './routes'
				], () => {
						render(Root, routes);
				})
}