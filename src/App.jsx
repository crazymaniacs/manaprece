import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/header/Header';
import './main.scss';

const App = (props) => (
  <div className="app-container">
    <Header /> {renderRoutes(props.route.routes)}
  </div>
);

export default App;
