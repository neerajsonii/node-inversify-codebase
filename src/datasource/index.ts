import * as glob from 'glob';
import { injectable } from 'inversify';
import _ from 'lodash';
import { TransactionOptions } from 'mongodb';
import mongoose from 'mongoose';
import { appConfig, dbConfig } from '../config/config';
import { IDbConnectionInstance } from '../infrastructure/repositories/repository.interface';
import { IDbOptions } from '../infrastructure/repositories/repository.interface';

@injectable()
export class DataSource {
    private dbConnInstance = {} as IDbConnectionInstance;
    private rootpath: string = '';
    private count: number = 0;

    constructor() {
        this.rootpath = appConfig.rootpath;
    }

    public setModel(name: string, model: mongoose.Model<any>): void { 
        this.dbConnInstance.models[name] = model;
    }
    /**
     * Method to init the database
     */
    
    public connectDatabase(): void {
        const options: IDbOptions = {
            poolSize: dbConfig.poolSize,
            useNewUrlParser: true,
            autoReconnect: true,
        };
        this.connect(options);
        const db = mongoose.connection;

        db.on('error', error => {
            console.log(`MongoDB connection error : ${error}`);
            mongoose.disconnect();
        });

        db.on('connected', () => {
            console.log(
                'connected to database at ' + dbConfig.connectionString
            );
            this.dbConnInstance.models = {};
            
            // enable this for transaction support and config accordingly
            // this.dbConnInstance.TransactionOption = this.getDbTransactionOptions();
            const models = glob.sync(
                this.rootpath + '/datasource/models/*.model.js'
            );
            models.forEach((model: string) => {
                require(model);
            });
        });

        db.on('reconnected', () => {
            console.log('MongoDB reconnected!');
        });

        db.on('disconnected', () => {
            console.log(`MongoDB disconnected! Reconnecting in ${dbConfig.retry_Timeout /1000} sec`);
            if (this.count < dbConfig.max_Connect) {
                setTimeout(() => this.connect(options), dbConfig.retry_Timeout);
            } else {
                console.log(`Error occured: No connection after ${dbConfig.max_Connect} attempts`);
                process.exit(0);
            }
        });
    }

    public getDbConnectionInstance(): IDbConnectionInstance {
        return this.dbConnInstance;
    }

    // transaction support
    private getDbTransactionOptions(): TransactionOptions {
        return {
            readConcern: {
                level: 'local'
            },
            writeConcern: {
                w: 'majority',
                j: false,
            },
        };
    }

    private async connect(options: IDbOptions) {
        this.count++;
        mongoose.connect(dbConfig.connectionString, options);
    }
}
