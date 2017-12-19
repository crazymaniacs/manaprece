import React, { Component } from 'react';
import Header from './components/header/Header';
import './main.scss';
import SvgImage from './images/svgimage.svg';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <h2>This is a body test</h2>
        <img style={{ width: '100%' }} src={SvgImage} />
      </div>
    );
  }
}

export default App;
