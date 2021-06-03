import { NextFunction, Request, Response } from 'express';
import Container from '../container';

export class BaseRoutes {

    constructor() { }
    
    public getControllerMethod(methodName: string, controllerType: any): any {
        return (
            req: Request,
            res: Response,
            next:NextFunction
        ) => {
            const controller = Container.get<any>(controllerType);
            return controller[methodName](req, res, next);
        }
    } 

    public getValidatorMethod(methodName: string,validatorType: any): any {
        return (
            req: Request,
            res: Response,
            next:NextFunction
        ) => {
            const validator = Container.get<any>(validatorType);
            return validator[methodName](req, res, next)
        }
    }
}