import { MongoClient, TransactionOptions } from 'mongodb';

export interface IRepository {
    listAll(query?: any, select?: string | any, populate?: any): Promise<any[]>
    findOne(query?: any, select?: string | any, populate?: any): Promise<any>;
    create(obj: any): Promise<any>;
    update(oldObj: any, newObj: any): Promise<any | any>;
    count(query: any): Promise<number>;
    deleteOne(query: any): Promise<any | any>;
    deleteMany(query: any): Promise<any | any>;
    aggregate(query: [any]): Promise<[any]>;
    [key: string]: any;
};

export interface IDbOptions {
    poolSize: number;
    useNewUrlParser: boolean;
    autoReconnect: boolean;
}

export interface IDbConnectionInstance extends MongoClient {
    models: any;
    TransactionOption: TransactionOptions;
};
