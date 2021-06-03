import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import * as https from 'https';
import morgan from 'morgan';
import * as path from 'path';
import socketio from 'socket.io';
import { appConfig } from './config/config';
import container from './container';
import { DataSource } from './datasource/index';
import Routes from './routes';
import { SocketServer } from './socket';
import TYPES from './types';

const dataSource : DataSource = container.get<DataSource>(TYPES.DataSource);

const app = express();
const initAppServer = async () => {
    /**
     * App Middleware
     */

    app.use(morgan('dev'));
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, AWS if you use an ELB, custom Nginx setup, etc) 
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    
    return app.listen(appConfig.port, () => {
        console.log(`[**] ${appConfig.name} : Server Started on Port ${appConfig.port} and pointing => ${appConfig.env}`);
    });
};

const initDatabase = async() => {
    return dataSource.connectDatabase();
};

const initRoutes = () => {
    Routes.initRoutes(app, express.Router());
};

/**
 * Start Socket Server
 */
const initSocketServer = async (server: http.Server | https.Server) => {
    /**
     * Create Socket Server
     */
    const io = socketio(server);

    /**
     * Host Socket Connection
     */
    SocketServer.init(io);

    console.log( `[**] Socket Listening on ${appConfig.port}`);
};

const init = async() => {
    await initDatabase();
    const appServer = await initAppServer();
    // await initSocketServer(appServer);
    initRoutes();
};

init();
