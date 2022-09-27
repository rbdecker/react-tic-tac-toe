import http from 'http';
import { Server } from 'socket.io';

let server = http.createServer();
let io = new Server(server, {
    cors: {
        origin: '*',        
    }
});

io.on('connection', () => {
    console.log('A new player has joined!');
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});