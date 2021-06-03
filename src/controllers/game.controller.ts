import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { Request, Response } from 'express';
import { ResponseUtil } from '../common/response';
import { IGame } from '../infrastructure/interfaces/game.interface';
import { GameService } from '../infrastructure/services/game.service';
import TYPES from '../types';

@injectable()
export class GameController extends ResponseUtil {
    constructor(
        @inject(TYPES.GameService) private gameService: GameService
    ) {
        super();
    }

    public async listGames(req: Request, res: Response) {
        const games: IGame[] = await this.gameService.listGames({});
        return this.sendRes(games, res, "Game List");
    }
    
    public async createGame(req: Request, res: Response) {
        const { body } = req;
        const game: IGame = await this.gameService.createGame(body.playerId);
        return this.sendRes(game, res, 'Game Created');
    }
    
    public async cancelGame(req: Request, res: Response) {
        const { gameId } = req.body;
        const game: IGame = await this.gameService.cancelGame(gameId);
        return this.sendRes(game, res, 'Game Cancelled');
    }
    
    public async startGame(req: Request, res: Response) {
        const { gameId } = req.body;
        await this.gameService.startGame(gameId);
        return this.sendRes({}, res, 'Game Started');
    }
}
