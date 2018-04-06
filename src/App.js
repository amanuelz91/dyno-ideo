import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Contract from './components/Contract/Contract'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dyno Contracts</h1>
        </header>
        <p className="App-intro">
          <Contract/> 
        </p>
      </div>
    );
  }
}

export default App;
