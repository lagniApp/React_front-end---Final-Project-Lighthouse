import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import beer from './images/beer.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={beer} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. Stuff
        </p>
        <div> <img src={beer} alt="beer" /> </div>
      </div>
    );
  }
}

export default App;
