import { Response } from 'express'
import * as httpStatusCodes from 'http-status-codes';
import { injectable } from 'inversify';
import 'reflect-metadata';


export interface IResponse {
    error: boolean,
    status: number,
    message: any,
    data?: any,
    statusMessage?: string
}

@injectable()
export class ResponseUtil {
    
    private statusCodes: any;

    constructor() { 
        this.statusCodes = httpStatusCodes;
    }

    public get getStatusCodes(): any{
        return this.statusCodes;
    }

   
    public sendErr = (errCode: number, res: Response, msg: any): void => {
        if (!errCode) { errCode = this.statusCodes.FORBIDDEN; }

        const apiResponse: IResponse = {
            error: true,
            status: errCode,
            statusMessage: this.statusCodes.getStatusText(errCode),
            message: msg || this.statusCodes.getStatusText(errCode)
        }
        res.status(errCode).send(apiResponse);
    }

    public sendRes = (data: any, res: Response, msg: any): void => {
        const apiResponse: IResponse = {
            error: false,
            status: this.statusCodes.OK,
            message: msg || 'null',
            data
        }

        res.status(this.statusCodes.OK).send(apiResponse);
    }
}