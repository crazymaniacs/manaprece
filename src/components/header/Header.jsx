import React from 'react';
import Ball from './ball.png';
import './Header.scss';

export default () => (
  <div className="header">
    <img src={Ball} />
    <h1>This is a Header</h1>
  </div>
);
