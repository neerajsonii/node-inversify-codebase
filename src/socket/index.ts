/**
 * This file contains the code required
 * to manage socket operations
 */
import { NextFunction } from 'express';
import socketio from 'socket.io';
import SocketAuth from './auth';
import { SocketClient } from './client';
import { SOCKET_EVENT_TYPES } from './socket.constants';
import { ISocket } from './socket.interface';

export class SocketServer {
    public static init(io: socketio.Server) {
        SocketServer.io = io;
        SocketServer.io
            .use((socket: ISocket, next: NextFunction) => {
                new SocketAuth(socket)
                    .authenticate()
                    .then(_ => next())
                    .catch((err: Error) =>
                        next(new Error(`401(UNAUTHORIZED) >> ${err}`))
                    );
            })
            .on(SOCKET_EVENT_TYPES.CONNECTION, (socket: ISocket) => {
                const client = new SocketClient(socket);
            });
    }

    /**
     * Method to emit event to all connected clients
     * @param event - Name of event
     * @param data - Data to be sent with this event
     * @param cb - Acknowledge callback triggered from client side
     */
    public static emitToAll(event: string, data?: any, cb?: () => void) {
        SocketServer.io.emit(event, data, cb);
    }

    /**
     * Method to emit event in room to all connected clients
     * @param room - Name of room
     * @param event - Name of event
     * @param data - Data to be sent with this event
     * @param cb - Acknowledge callback triggered from client side
     */
    public static emitInRoom(room: string, event: string, data?: any, cb?: () => void ) {
        SocketServer.io.to(room).emit(event, data, cb);
    }
    
    private static io: socketio.Server;
}
