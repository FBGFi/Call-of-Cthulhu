import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';
import publicIp from 'public-ip';

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

type TMessage = {
    timeStamp: number,
    message: string,
    sender: string,
    type: 'roll' | 'alert' | 'message'
}

const connectedPlayers: TConnectedPlayers = {};

let hostId: string;
let roomCode: string;

const getCurrentTime = (): string => {
    return new Date(Date.now()).toLocaleString();
}


const getPublicIp = async () => {
    const data = await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"]
    });
    return data;
}

io.on('connection', socket => {

    socket.on('connect-host', (room) => {
        if (!hostId) {
            console.log(`[${getCurrentTime()}]: Host has connected`);

            hostId = socket.id;
            roomCode = room;

            (async () => {
                const ip = await getPublicIp();
                socket.emit('get-public-ip', ip);
            })();

            const message: TMessage = {
                timeStamp: Date.now(),
                message: 'Host has connected to the room',
                sender: 'SERVER',
                type: 'roll'
            }
            socket.emit('new-player-message', message);

            for (const socketId in connectedPlayers) {
                if (connectedPlayers[socketId]) {
                    socket.emit('player-connected', connectedPlayers[socketId]);
                }
            }
        }
    });

    socket.on('disconnect', () => {

        if (socket.id === hostId) {
            console.log(`[${getCurrentTime()}]: Host has disconnected`);
            hostId = undefined;
            io.emit('host-disconnected');
            socket.disconnect();

        } else if (connectedPlayers[socket.id]) {
            console.log(`[${getCurrentTime()}]: Player disconnected`);
            io.to(hostId).emit('new-player-message', {
                timeStamp: Date.now(),
                message: (connectedPlayers[socket.id].CHARACTER_INFO?.PLAYER ? connectedPlayers[socket.id].CHARACTER_INFO.PLAYER : 'Unnamed Player') + ' has disconnected',
                sender: 'SERVER',
                type: 'alert'
            });
            io.to(hostId).emit('player-disconnected', connectedPlayers[socket.id]);
            delete connectedPlayers[socket.id];
        }
        socket.disconnect();
    });
    socket.on('host-send-messages', data => {
        socket.broadcast.emit('new-messages', data);
    });
    socket.on('verify-player', (data) => {
        if (!connectedPlayers[socket.id] && data && data === roomCode) {
            socket.emit('player-verified');
        } else if (roomCode && (!data || data !== roomCode)) {
            socket.emit('incorrect-room-code');
            socket.disconnect();
        } else {
            socket.emit('room-not-started');
            socket.disconnect();
        }

    });
    socket.on('connect-player', (data) => {
        if (!connectedPlayers[socket.id]) {
            console.log(`[${getCurrentTime()}]: Player has connected`);
            connectedPlayers[socket.id] = data;
            io.to(hostId).emit('player-connected', data);
            io.to(hostId).emit('new-player-message', {
                timeStamp: Date.now(),
                message: (data?.CHARACTER_INFO?.PLAYER ? data.CHARACTER_INFO.PLAYER : 'Unnamed Player') + ' has connected to the room',
                sender: 'SERVER',
                type: 'roll'
            });
        }
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
                io.to(hostId).emit('player-disconnected', connectedPlayers[socket.id]);
                io.sockets.sockets.delete(id);
            }
        }
    });
});

httpServer.listen(process.env.PORT, async() => {
    console.log(`[${getCurrentTime()}]: Server listening on ${await getPublicIp()}:${process.env.PORT}`);
})