import React, {Component} from 'react';
import Header from './components/header/Header';
import './main.scss';
import SvgImage from './images/svgimage.svg';
import {renderRoutes} from 'react-router-config';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header/> {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

export default App;
