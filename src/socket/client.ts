/**
 * This file contains the code required to
 * handle socket connections
 */
import socketio from 'socket.io';
import { ISocket } from './socket.interface';

export class SocketClient {
    constructor(private socket: ISocket, private io?: socketio.Server) {}

    public broadcast(event: string, data?: any) {
        this.socket.broadcast.emit(event, data);
    }

    public joinRoom(name: string) {
        this.socket.join(name);
    }
}
