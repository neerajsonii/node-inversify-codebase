import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as _ from 'lodash';
import { ResponseUtil } from '../../common/response';
import TYPES from '../../types';
import { Game } from '../interfaces/game.interface';
import { GameService } from '../services/game.service';

@injectable()
export class GameValidator extends ResponseUtil{

    constructor(
        @inject(TYPES.GameService) private gameService: GameService
    ) { 
        super();
    }

    public validateCreateGamePayload = (req: Request, res: Response, next: NextFunction): void => {
        const { body } = req;
        if (!body.playerId) {
            return this.sendErr(this.getStatusCodes.FORBIDDEN, res, 'playerId is missing');
        } else { 
            next();
        }
    }

    public validateListGamePayload = (req: Request, res: Response, next: NextFunction): void => {
        next();
    }
    
    public validateUpdateGamePayload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { gameId } = req.body;
        const game: Game = await this.gameService.getGameById(gameId);
        if (!game) {
            return this.sendErr(this.getStatusCodes.NOT_FOUND, res,  'Game not found');
        }
        if (game.Status === 200 || game.Status === 300) {  // check status for cancel or expired
            return this.sendErr(this.getStatusCodes.FORBIDDEN, res,  'Game Cancelled or Expired');
        }
        else { 
            next();
        }
    }
}