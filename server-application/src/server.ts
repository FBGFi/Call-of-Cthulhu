import { Server } from 'socket.io';
import * as http from 'http';

const httpServer = http.createServer();
const io: Server = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

type TConnectedPlayers = {
    [socketId: string]: any
};

const connectedPlayers: TConnectedPlayers = {};

let hostId: string;

io.on('connection', socket => {

    socket.on('connect-host', (data) => {
        console.log('Host has connected');

        hostId = socket.id;
        socket.emit('new-player-message', {
            timeStamp: Date.now(),
            message: 'Host has connected to the room',
            sender: 'SERVER',
            type: 'roll'
        });

        for (const socketId in connectedPlayers) {
            if (connectedPlayers[socketId]) {
                socket.emit('player-connected', connectedPlayers[socketId]);
            }
        }

        socket.on('disconnect', () => {
            console.log('Host has disconnected');
            io.emit('host-disconnected');
            socket.disconnect();
        });
    });
    socket.on('host-send-messages', data => {
        socket.broadcast.emit('new-messages', data);
    })
    socket.on('connect-player', (data) => {
        if (!connectedPlayers[socket.id]) {
            console.log('Player has connected');
            connectedPlayers[socket.id] = data;
            io.to(hostId).emit('player-connected', data);
            io.to(hostId).emit('new-player-message', {
                timeStamp: Date.now(),
                message: (data?.CHARACTER_INFO?.PLAYER ? data.CHARACTER_INFO.PLAYER : 'Unnamed Player') + ' has connected to the room',
                sender: 'SERVER',
                type: 'roll'
            });
        }
        socket.on('disconnect', () => {

            io.to(hostId).emit('player-disconnected', connectedPlayers[socket.id]);
            if (connectedPlayers[socket.id]) {
                console.log('Player disconnected');
                io.to(hostId).emit('new-player-message', {
                    timeStamp: Date.now(),
                    message: (data?.CHARACTER_INFO?.PLAYER ? data.CHARACTER_INFO.PLAYER : 'Unnamed Player') + ' has disconnected',
                    sender: 'SERVER',
                    type: 'alert'
                });
            }
            delete connectedPlayers[socket.id];
            socket.disconnect();
        });
    });
    socket.on('player-data-update', data => {
        io.to(hostId).emit('player-data-update', data);
    });
    socket.on('player-send-message', (data) => {
        if (!connectedPlayers[socket.id]) {
            socket.disconnect();
        } else {
            io.to(hostId).emit('new-player-message', data);
        }
    })
    socket.on('kick-player', (characterId) => {
        for (const id in connectedPlayers) {
            if (connectedPlayers[id] && connectedPlayers[id].CHARACTER_ID === characterId) {
                delete connectedPlayers[id];
                io.to(id).emit('player-was-kicked');
                io.sockets.sockets.delete(id);
            }
        }
    });
});

httpServer.listen(3001, () => {
    console.log('Server listening on port 3001');
})