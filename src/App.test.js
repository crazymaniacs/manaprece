import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('check enzyme', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
