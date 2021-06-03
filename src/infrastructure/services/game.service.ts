import { inject, injectable } from 'inversify';
import { Clock } from '../../common/clock';
import TYPES from '../../types';
import { IGame } from '../interfaces/game.interface';
import { GameRepository } from '../repositories/game.repository';

export interface IGameService {
    listGames(queryObj: any): Promise<IGame[]>;
    getGameById(gameId: string): Promise<IGame>;
    createGame(playerId: string): Promise<IGame>;
    cancelGame(gameId: string): Promise<IGame>;
    startGame(gameId: string): Promise<void>;
}

@injectable()
export class GameService  implements IGameService {
    
    constructor(
        @inject(TYPES.GameRepository) private gameRepository: GameRepository,
    ) { }

    public async listGames(queryObj: any): Promise<IGame[]>{
        return this.gameRepository.getGameList(queryObj);
    }
    
    public async getGameById(gameId: string): Promise<IGame>{
        const obj = {
            Id: gameId
        }
        return this.gameRepository.getGameById(obj);
    }

    public async cancelGame(gameId: string): Promise<IGame> { 
        const query = {
            Id: gameId
        };
        const newObj = {
            Status: 200, // cancelled,
            CancelledAt: Clock.toUnixTimeStamp()
        }
        return this.gameRepository.updateGame(query, newObj);
    }

    public async createGame(playerId: string): Promise<IGame> {  
        const obj = { CreatedBy: playerId };
        return await this.gameRepository.createGame(obj);
    }

    public async joinGame(gameId: string, playerId: string): Promise<any> { 
         
    }
    
    public async startGame(gameId: string): Promise<void> { 

        const query = {
            Id: gameId
        };
        const newObj = {
            Status: 300, // started,
            IsRunning: true,
            CancelledAt: Clock.toUnixTimeStamp()
        }
        await this.gameRepository.updateGame(query, newObj);
        return;
    }

}