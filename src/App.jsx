import React, { Component } from 'react';
import Header from './components/Header';
import './main.scss';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header/>
         <h2>
           This is a body
         </h2>
      </div>
    );
  }
}

export default App;
