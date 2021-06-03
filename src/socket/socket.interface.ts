/**
 * This file contains the code required
 * to define interfaces for Socket related operations.
 */
import socketio from 'socket.io';

export interface ISocket extends socketio.Socket {
    userIdentity?: any;
    UserRoleId?: any;
}

export interface IMessage {
    [key: string]: any;
}

export interface INotificationPayload {
    identifier?: string;
    channel: string;
    message: IMessage;
}
