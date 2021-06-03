import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
import { Clock } from '../../common/clock';
import container from '../../container';
import TYPES from '../../types';
import { DataSource } from '../index';

const Schema = mongoose.Schema;
const SCHEMA_NAME = 'Games';

const model = new Schema({
    Id: {
        type: String,
        default: uuid.v4,
        select: true
    },

    CreatedBy: {
        type: String,
        require: true,
        select: true
    },

    IsRunning: {
        type: Boolean,
        default: false,
        select: true
    },

    IsDeleted:{
        type: Boolean,
        default: false
    },

    Status: {
        type: Number,
        default: 100
    },

    CreatedAt: {
        type: Number,
        default: Clock.toUnixTimeStamp() ,
        select: true
    },
    
    ExpiredAt: {
        type: Number,
        default: null,
        select: true
    },
    
    CancelledAt: {
        type: Number,
        default: null,
        select: true
    },

    Region: {
        type: String,
        default:'India-Region'
    },

    Country: {
        type: String,
        default:'India'
    }
});
const modelInstance = mongoose.model(SCHEMA_NAME, model);
container.get<DataSource>(TYPES.DataSource).setModel(SCHEMA_NAME, modelInstance);
export default modelInstance;
