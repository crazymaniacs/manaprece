import React, {Component} from 'react';
import Ball from './ball.png';
import './Header.scss';

export class Header extends Component {
  render() {
    console.log(Ball);
    return (
      <div className="header">
        <img src={Ball}/>
        <h1>This is a Header</h1>
      </div>
    );
  }
}

export default Header;
