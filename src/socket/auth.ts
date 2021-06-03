/**
 * This file contains the code required to
 * authenticate socket connection requests.
 */
import { get as _get } from 'lodash';
import { ERRORS } from './socket.constants';
import { ISocket } from './socket.interface';

export default class SocketAuth {
    constructor(private socket: ISocket) {}

    public authenticate(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const token: string = this.getToken();

            // socket authentication logic here

            if (!token) {
                reject(ERRORS.CREDENTIALS_NOT_FOUND);
                return;
            }
            return resolve(true);
        });
    }

    public getRole(): string {
        return _get(this.socket, 'userIdentity', null);
    }

    private getToken(): string {
        return _get(this.socket, 'handshake.query.token', null);
    }
}
