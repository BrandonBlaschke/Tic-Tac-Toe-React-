const DEPTH_LIMIT = 4; 

class Node {
    constructor(startBoard, depth, player, value) {
        this.board = createNewBoard(startBoard);
        this.children = [];
        this.depth = depth;
        this.player = player; 
        this.value = value; 
        this.createChildren(); 
    }

    //Create children to a certin depth limit 
    createChildren = () => {
        if (this.depth < DEPTH_LIMIT) {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] === null) {

                        //Create a new Node and append to the children array 
                        let newBoard = createNewBoard(this.board); 
                        let tempPlayer = 'X'; 
                        if (this.depth % 2 === 0) {
                            newBoard[i][j] = 'O'; 
                            tempPlayer = 'O'; 
                        } else {
                            newBoard[i][j] = 'X'; 
                        }
                        let value = this.realValue(newBoard, tempPlayer)
                        let node = new Node(newBoard, this.depth + 1, tempPlayer, value);
                        this.children.push(node);
                    }
                }
            }

        }
    }

    //1 for a Node that makes O win, -1 for X winning 
    realValue = (board, player) => {

        //Current Piece, -1 for player, 1 for ai
        let mult = 1; 
        if (player === 'X') mult = -1; 

        //Diagonal checkers 
        let checkRight = true; 
        let checkLeft = true; 

        //Horizontal  
        for (let i = 0; i < board.length; i++) {
            let counterHorz = true; 
            let counterVertical = true; 

            //For Diagonal 
            checkRight = [i][i] === player && checkRight; 
            checkLeft = board[2-i][0+i] && checkLeft; 

            for (let j = 0; j < board[i].length; j++) {
                counterHorz = board[i][j] ===  player && counterHorz; 
                counterVertical = board[j][i] ===  player && counterVertical; 
            }
            if (counterHorz || counterVertical) {
                return 1 * mult; }
        }

        if (checkLeft || checkRight) return 1 * mult 

        return 0; 
    }
}

//Create Deep Copy of board 
const createNewBoard = (board) => {
    let newBoard = [...board];
    for (let i = 0; i < newBoard.length; i++) {
        newBoard[i] = [...board[i]];
    }
    return newBoard; 
}

const minMax = (node, depth, player) => {
    if (depth === 2) {
        return node.value; 
    }

    //Max player
    if (player === 'O') {
        let val = -100; 
        for (let i = 0; i < node.children.length; i++) {
            val = Math.max(val, minMax(node.children[i], depth + 1, 'X'));
        }
        return val; 
    } else { //Min player
        let val = 100; 
        for (let i = 0; i < node.children.length; i++) {
            val = Math.min(val, minMax(node.children[i], depth + 1, 'O'));
        }
        return val; 
    }
}

const aiTurn = (board) => {

    //Create tree
    let root = new Node(board, 0, "O", 0);

    //Find best path 
    let bestChoice = -100; 
    let decision = board; 
    for (let i = 0; i < root.children.length; i++) {
        let val = minMax(root.children[i], 1, 'X'); 
        if (val > bestChoice) {
            bestChoice = val; 
            decision = root.children[i].board; 
        }
    }

    return decision; 
}

export default aiTurn; 