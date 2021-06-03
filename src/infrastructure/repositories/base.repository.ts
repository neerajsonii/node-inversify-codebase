import { injectable, unmanaged } from 'inversify';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import container from '../../container';
import { DataSource } from '../../datasource';
import TYPES from '../../types';
import { IDbConnectionInstance, IRepository } from './repository.interface';

@injectable()
export class BaseRepository implements IRepository {

    protected readonly models: any;
    protected readonly dbConn = {} as IDbConnectionInstance;
    protected readonly model = {} as Model<any>;
    protected readonly dataSource: DataSource = container.get<DataSource>(TYPES.DataSource)

    constructor(
        @unmanaged() modelName: string
    ) {
        console.log();
        
        this.dbConn = this.dataSource.getDbConnectionInstance();
        this.models = this.dbConn.models;
        this.model = this.models[modelName];
    }

    public listAll(query?: any, select?: string | any, populate?: any): Promise<any[]> {
        return this.model.find(query)
            .lean()
            .select(select || '')
            .populate(populate || '')
            .exec();
    };
    
    public findOne(query?: any, select?: string | any, populate?: any): Promise<any> {
        return this.model.findOne(query)
            .lean()
            .select(select || '')
            .populate(populate || '')
            .exec();
    };

    public create(obj: any): Promise<any> {
        return new this.model(obj).save();
    };

    public update(oldObj: any, newObj: any): Promise<any | any> {
        return this.model.findOneAndUpdate({Id: oldObj.Id}, {
            $set: newObj
        }, {
                new: true
            })
            .exec();
    };

    public count(query: any): Promise<number> {
        return this.model.countDocuments(query)
            .exec();
    };

    public deleteOne(query: any): Promise<any | any> {
        return this.model.findOneAndUpdate(query, {
            $set: { isDeleted: true }
        }, {
                new: true
            })
            .exec();
    };

    public deleteMany(query: any): Promise<any | any> {
        return this.model.updateMany(query, {
            $set: { isDeleted: true }
        }, {
                multi: true
            })
            .exec();
    };

    public aggregate(query: [any]): Promise<[any]> {
        return this.model.aggregate(query)
            .exec();
    };
}