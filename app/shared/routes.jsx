import React from 'react';
import { Route } from 'react-router';
import App from './App';
import About from './About';

export default () => (
  <div>
    <Route exact name="index" path="/" component={App} />
    <Route path="/about" component={About} />
  </div>
);
