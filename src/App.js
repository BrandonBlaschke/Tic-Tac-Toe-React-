import React, { Component } from 'react';
import './App.css';
import TicTacToe from './components/tic_tac_toe/ticTacToe';

class App extends Component {
  render() {
    return (
      <div>
        <div className="Title">
          <h1 >Tic-Tac-Toe</h1>
        </div>
        <TicTacToe rows="3" cols="3"/>
      </div>
    );
  }
}

export default App;
