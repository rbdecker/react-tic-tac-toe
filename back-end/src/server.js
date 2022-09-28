import http from 'http';
import { Server } from 'socket.io';

let server = http.createServer();
let io = new Server(server, {
    cors: {
        origin: '*',        
    }
});

const getStartingMatrix = () => {
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
}

let currentPlayer = 'X';

let playerXMoves = getStartingMatrix();
let playerOMoves = getStartingMatrix();

let playerXSocket;
let playerOSocket;

io.on('connection', socket => {
    if (playerXSocket) {
        playerOSocket = socket;
        playerOSocket.emit('start');
        playerXSocket.emit('start');
        playerOSocket.emit('other player turn');
        playerXSocket.emit('your turn');
        console.log('Player O has joined! Starting the game...');

        socket.on('disconnect', () => {
            playerOSocket = undefined;

            if (playerXSocket) {
                playerXSocket.emit('info', 'The other player has disconnected, ending the game...');
                playerXSocket.disconnect();
                playerXSocket = undefined;
            }
        });        
    } else {
        playerXSocket = socket;
        console.log('Player X has joined! Waiting for player O');

        socket.on('disconnect', () => {
            playerXSocket = undefined;

            if (playerOSocket) {
                playerOSocket.emit('info', 'The other player has disconnected, ending the game...');
                playerOSocket.disconnect();
                playerOSocket = undefined;
            };
        });
    }

    socket.on('new move', (row, column) => {
        if (currentPlayer === 'X' && socket === playerXSocket) {
            playerXMoves[row][column] = 1;
            currentPlayer = 'O';
            playerOSocket.emit('your turn');
            playerXSocket.emit('other player turn');    
        } else if (currentPlayer === 'O' && socket === playerOSocket) {
            playerOMoves[row][column] = 1;
            currentPlayer = 'X';
            playerXSocket.emit('your turn');
            playerOSocket.emit('other player turn');
        }
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});