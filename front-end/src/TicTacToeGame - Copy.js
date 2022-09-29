import { useState, useEffect } from 'react';
import socketIoClient from 'socket.io-client';
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
        && moves[2][0] && moves[2][2];
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

    const [socket, setSocket] = useState(null);
    const [playerIsWaiting, setPlayerIsWaiting] = useState(true);
    const [isPlayersTurn, setIsPlayersTurn] = useState(false);

    useEffect(() => {
        let newSocket = socketIoClient('http://127.0.0.1:8080');
        setSocket(newSocket);

        newSocket.on('info', data => {
            alert(data);
        });

        newSocket.on('start', () => {
            setPlayerIsWaiting(false);
            //alert('Both players are ready, starting the game...');
        });

        newSocket.on('other player turn', () => {
            setIsPlayersTurn(false);
        });

        newSocket.on('your turn', () => {
            setIsPlayersTurn(true);
        });

        return () => { newSocket.disconnect() };
    }, []);

    useEffect(() => {
        const newGameState = getNextGameState(playerXMoves, playerOMoves);
        setCurrentGameState(newGameState);
    }, [playerXMoves, playerOMoves]);

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const handleTurn = (row, column) => {
        socket.emit('new move', row, column);
    }

    if (playerIsWaiting) {
        return <h1>Waiting for another player to join...</h1>
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
        <h1>Tic-Tac-Toe</h1>
        <TicTacToeBoard
            playerXMoves={playerXMoves}
            playerOMoves={playerOMoves}
            onClickCell={handleTurn} />
        {isPlayersTurn 
            ? <h3>It's your turn</h3>
            : <h3>Waiting for the other player's input...</h3>}
        </>
    );
}

export default TicTacToeGame;