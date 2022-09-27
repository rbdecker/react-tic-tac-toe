import http from 'http';
import { Server } from 'socket.io';

let server = http.createServer();
let io = new Server(server, {
    cors: {
        origin: '*',        
    }
});

let playerXSocket;
let playerOSocket;

io.on('connection', socket => {
    if (playerXSocket) {
        playerOSocket = socket;
        playerOSocket.emit('info', 'You are the second player, the game will now start!');
        playerXSocket.emit('info', 'The second player has joined, the game will now start');
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
        playerXSocket.emit('info', 'You are the first player, waiting for the second player to join...');
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
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});