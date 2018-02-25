import { createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
});

export default createStore(
  rootReducer,
  compose(window.devToolsExtension ? window.devToolsExtension() : (f) => f)
);
