import React, { Component } from 'react';
import './App.css';
import PokerTable from './customComponents/PokerTables.js'

class App extends Component {
  render() {
    return (
      <div className="container">
            <PokerTable />
      </div>
    );
  }
}

export default App;
