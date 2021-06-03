/**
 * This file contains the constants required
 * for socket operations.
 */
export const EVENTS = {
    GAMES: {
        STARTED: 'STARTED',
        CREATED: 'CREATED',
    }
};

export const SOCKET_EVENT_TYPES = {
    CONNECTION: 'connection',
};

export const ERRORS = {
    CREDENTIALS_NOT_FOUND: 'Auth Token not found',
    INVALID_TOKEN: 'Invalid Auth token.',
    INVALID_VALUES: 'Provided values are invalid'
};
