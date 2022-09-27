import { useState, useEffect } from 'react';
import TicTacToeBoard from './TicTacToeBoard';

const getStartingMatrix = () => {
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
}

const RUNNING = 'RUNNING';
const PLAYER_X_WINS = 'PLAYER_X_WINS';
const PLAYER_O_WINS = 'PLAYER_O_WINS';
const CATS_GAME = 'CATS_GAME';

const isHorizontalWin = (moves) => {
    return moves.some(row => row.every(x => x));
}

const isVerticalWin = (moves) => {
    return [0, 1, 2].some(columnNumber => 
        moves.every(row => row[columnNumber]));
}

const isDiagonalWin = (moves) => {
    return (moves[0][0] && moves[1][1] && moves[2][2])
        || (moves[0][2] && moves[1][1] && moves[2][0]);
}

const isCornersWin = (moves) => {
    return moves[0][0] && moves[0][2]
        && moves [2][0] && moves[2][2];
}

const boardIsFull = (xMoves, oMoves) => {
    return [0, 1, 2].every(rowNumber => {
        return [0, 1, 2].every(colNumber => {
            return xMoves[rowNumber][colNumber]
                || oMoves[rowNumber][colNumber];
        })
    })
}

const getNextGameState = (playerXMoves, playerOMoves) => {
    const playerXWins = isHorizontalWin(playerXMoves)
        || isVerticalWin(playerXMoves)
        || isDiagonalWin(playerXMoves)
        || isCornersWin(playerXMoves);

    if (playerXWins) {
        return PLAYER_X_WINS;
    }

    const playerOWins = isHorizontalWin(playerOMoves)
        || isVerticalWin(playerOMoves)
        || isDiagonalWin(playerOMoves)
        || isCornersWin(playerOMoves);

    if (playerOWins) {
        return PLAYER_O_WINS;
    }

    const isCatGame = boardIsFull(playerXMoves, playerOMoves);

    if (isCatGame) {
        return CATS_GAME;
    }

    return RUNNING;
}

const TicTacToeGame = () => { 
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [playerXMoves, setPlayerXMoves] = useState(getStartingMatrix());
    const [playerOMoves, setPlayerOMoves] = useState(getStartingMatrix());
    const [currentGameState, setCurrentGameState] = useState(RUNNING);

    useEffect(() => {
        const newGameState = getNextGameState(playerXMoves, playerOMoves);
        setCurrentGameState(newGameState);
    }, [playerXMoves, playerOMoves]);

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const handleTurn = (row, column) => {
        console.log('Handling...');
        if (currentPlayer === 'X') {
            const newMoves = [...playerXMoves];
            newMoves[row][column] = 1;
            setPlayerXMoves(newMoves);
        } else {
            const newMoves = [...playerOMoves];
            newMoves[row][column] = 1;
            setPlayerOMoves(newMoves);
        }

        togglePlayer();
    }

    if (currentGameState === PLAYER_X_WINS) {
        return <h1>Player X Wins!!</h1>;
    }

    if (currentGameState === PLAYER_O_WINS) {
        return <h1>Player O Wins!!</h1>;
    }

    if (currentGameState === CATS_GAME) {
        return <h1>Cats' Game!! Nobody Wins!</h1>
    }

    return (
        <>
        <TicTacToeBoard
            playerXMoves={playerXMoves}
            playerOMoves={playerOMoves}
            onClickCell={handleTurn} />
        <h3>It is Player {currentPlayer}'s turn</h3>
        </>
    );
}

export default TicTacToeGame;