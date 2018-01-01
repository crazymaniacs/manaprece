import React, {Component} from 'react';
import Header from './components/header/Header';
import './main.scss';
import SvgImage from './images/svgimage.svg';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is a body test</h2>
        <Link to="/about">About</Link>
        <img style={{
          width: '100%'
        }} src={SvgImage}/>
      </div>
    );
  }
}

export default Home;
