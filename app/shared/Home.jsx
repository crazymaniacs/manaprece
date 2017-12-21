import React, { Component } from 'react';
import Header from './components/header/Header';
import './main.scss';
import SvgImage from './images/svgimage.svg';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is a body test</h2>
        <img style={{ width: '100%' }} src={SvgImage} />
      </div>
    );
  }
}

export default Home;
