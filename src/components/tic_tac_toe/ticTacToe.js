import React,{Component} from 'react';
import './ticTacToe.css';
import Box from '../../contaniers/box/box'; 

class TicTacToe extends Component {

    state = {
        playerXTurn: true, 
        playerOTurn: false,
        winner: null,
        board: []
    }

    //This will create the board in the state with given rows / cols when component is mounted 
    componentDidMount() {
        this.createBoard(this.props.rows, this.props.cols); 
    }

    //On whichever players turn, mark the board if not already marked 
    clickHandler = (row, col) => {

        //Create Deep Copy of board 
        let newBoard = [...this.state.board]; 
        for (let i = 0; i < newBoard.length; i++) {
            newBoard[i] = [...this.state.board[i]]; 
        }
        newBoard[row][col] = "X"; 

        this.setState({board: newBoard})
    }

    //Creates the game board and sets the state 
    createBoard = (rows, cols) => {
        let newBoard = []; 
        
        for (let i = 0; i < rows; i++) {
            let row = []; 
            for (let j = 0; j < cols; j++) {
                row.push(null); 
            }
            newBoard.push(row);
        }

        this.setState({board: newBoard});
    }

    render() {

        //Create JSX elements for board 
        let count = 0 
        let board = []; 
        this.state.board.map((arr, row) => {
            arr.map((val, col) => {
                let box = <Box key={count} clicked={() => this.clickHandler(row, col)}>{val}</Box>
                board.push(box); 
                count++; 
                return null;
            })
            return null; 
        })

        return (
            <div>
                <div className="Grid">
                    {board}
                </div>
            </div>
        );
    }
};

export default TicTacToe; 