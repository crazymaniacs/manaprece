import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.scss';
import SvgImage from './images/svgimage.svg';

const Home = () => (
  <div>
    <h2>This is a body test</h2>
    <Link to="/about">About</Link>
    <img
      style={{
        width: '100%'
      }}
      src={SvgImage}
    />
  </div>
);

export default Home;
