import { injectable } from 'inversify';
import * as _ from 'lodash';
import { IGame } from '../interfaces/game.interface';
import { BaseRepository } from './base.repository';

const TABLE_NAME = 'Games';

export interface IGameRepository {
    getGameList(queryObj: any): Promise<IGame[]>;
    getGameById(queryObj: any): Promise<IGame>;
    createGame(queryObj: any): Promise<IGame>;
    updateGame(queryObj: any, data:any): Promise<IGame>;
}
@injectable()
export class GameRepository extends BaseRepository implements GameRepository {
    constructor() { 
        super(TABLE_NAME);
    }

    public async createGame(queryObj: any): Promise<IGame> { 
        queryObj = this.sanitizeObject(queryObj, ['CreatedBy']);
        return this.create(queryObj);
    }
    
    public async getGameList(queryObj: any): Promise<IGame[]> { 
        return this.listAll(queryObj);
    }
   
    public async getGameById(queryObj: any): Promise<IGame> { 
        return this.findOne(queryObj);
    }
    
    public async updateGame(queryObj: any, data: any): Promise<IGame> { 
        queryObj = this.sanitizeObject(queryObj, ['CancelledAt','Status']);
        return this.update(queryObj, data);
    }

    private sanitizeObject(obj: {[key: string]: any}, keys: string[]) { 
        return _.pick(obj, keys);
    }

}