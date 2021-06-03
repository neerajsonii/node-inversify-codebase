import * as express from 'express';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerUiOptions } from '../config/config';
import { rateLimit as rateLimitConfig } from '../config/config';
import {API_DOC} from './api-doc';
import { GameRoutes } from './game.routes';

const rateLimiter = rateLimit(rateLimitConfig);

export default class Routes {
    public static initRoutes(app: express.Application, router: express.Router) {
        /**
         * Initialize App Routes
         */
        new GameRoutes().init(router);
        // app.use(rateLimiter);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(API_DOC, swaggerUiOptions));
        app.get('/health', (req, res) => res.json({ status: true, message: 'Server Health OK!' }));
        app.use('/api/', router);

        /**
         *  Handle 404 routes
         */

        app.use((req: express.Request, res: express.Response) => {
            res.status(404).json({
                status: 404,
                message: `This route does not exist.`
            })
          })
    }
}
