import React, { Component } from 'react';
import './App.css';
import TicTacToe from './components/tic_tac_toe/ticTacToe';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="Title">Tic-Tac-Toe</h1>
        <TicTacToe rows="3" cols="3"/>
      </div>
    );
  }
}

export default App;
