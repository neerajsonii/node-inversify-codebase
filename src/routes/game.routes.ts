import * as express from 'express';
import { injectable } from 'inversify';
import TYPES from '../types';
import { BaseRoutes } from './baseroutes';

@injectable()
export class GameRoutes extends BaseRoutes {
    public init = (router: express.Router): void => {
        router.get('/game/list',
            this.getValidatorMethod('validateListGamePayload', TYPES.GameValidator),
            this.getControllerMethod('listGames', TYPES.GameController)
        );
        router.put('/game/start',
            this.getValidatorMethod('validateUpdateGamePayload', TYPES.GameValidator),
            this.getControllerMethod('startGame', TYPES.GameController)
        );
        router.put('/game/cancel',
            this.getValidatorMethod('validateUpdateGamePayload', TYPES.GameValidator),
            this.getControllerMethod('cancelGame', TYPES.GameController)
        );
        router.post('/game/create',
            this.getValidatorMethod('validateCreateGamePayload', TYPES.GameValidator),
            this.getControllerMethod('createGame', TYPES.GameController)
        );
    };
}
