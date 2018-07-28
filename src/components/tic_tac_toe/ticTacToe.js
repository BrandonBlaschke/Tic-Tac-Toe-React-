import React,{Component} from 'react';
import './ticTacToe.css';
import Box from '../../contaniers/box/box'; 
import PopUp from '../PopUp/popUp';

class TicTacToe extends Component {

    state = {
        playerTurn: 'X',
        moves: 0,
        gameOver: false,
        board: []
    }

    //This will create the board in the state with given rows / cols when component is mounted 
    componentDidMount() {
        this.createBoard(this.props.rows, this.props.cols); 
    }

    //Check and see if the last move ended with a winner 
    checkWinner = (currentBoard, x, y) => {

        if (this.state.moves + 1 >= 9) {
            return true; 
        }

        //Current Piece 
        let player = currentBoard[x][y]; 

        //Diagonal checkers 
        let checkRight = true; 
        let checkLeft = true; 
        
        //Horizontal  
        for (let i = 0; i < this.props.rows; i++) {
            let counterHorz = true; 
            let counterVertical = true; 

            //For Diagonal 
            checkRight = currentBoard[i][i] === player && checkRight; 
            checkLeft = currentBoard[2-i][0+i] && checkLeft; 

            for (let j = 0; j < this.props.cols; j++) {
                counterHorz = currentBoard[i][j] === player && counterHorz; 
                counterVertical = currentBoard[j][i] === player && counterVertical; 
            }
            if (counterHorz || counterVertical) return true; 
        }

        if (checkLeft || checkRight) return true; 

        return false; 
    }

    //On whichever players turn, mark the board if not already marked 
    clickHandler = (row, col) => {

        //Create Deep Copy of board 
        let newBoard = [...this.state.board]; 
        for (let i = 0; i < newBoard.length; i++) {
            newBoard[i] = [...this.state.board[i]]; 
        }

        if (newBoard[row][col] == null) {
            newBoard[row][col] = this.state.playerTurn;
        }

        const gameOver = this.checkWinner(newBoard, row, col); 
        this.setState({board: newBoard, moves: this.state.moves + 1, gameOver: gameOver});

    }

    //Resets the game and state back to start
    resetHandler = () => {
        this.createBoard(this.props.rows, this.props.cols);

        this.setState({gameOver: false, moves: 0, playerTurn: 'X'});
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

        //Checking to display backdrop / popup
        let backdrop = null; 
        if (this.state.gameOver) {
            backdrop = <PopUp clicked={this.resetHandler}>GAMEOVER: {this.state.playerTurn} WINS</PopUp>
        }

        return (
            <div>
                {backdrop}
                <div className="Grid">
                    {board}
                </div>
            </div>
        );
    }
};

export default TicTacToe; 