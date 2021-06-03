
import { config } from 'dotenv'
import * as path from 'path';
// import * as dotenv from 'dotenv';


/**
 * This file contains the config
 * required to run the app
 */

// initializing env file
config({ path: path.resolve(__dirname, '../../.env') });

/**
 * App Config
 */
export const appConfig = {
    name: process.env.APP_NAME || 'App Name',
    description: 'Description',
    version: '1.0',
    host: process.env.HOST,
    auth: false,
    env: process.env.NODE_ENV,
    rootpath: path.normalize(__dirname + '/..'),
    port: process.env.PORT,
    allowedCorsOrigin: '*'
};

/**
 * DB Connection
 */
export const dbConfig = {
    poolSize: 100,
    connectionString: process.env.MONGODB_CONNECTION_STRING || '',
    retry_Timeout: 2000,
    max_Connect: 3
};

/**
 * JWT Config
 */
export const jwtConfig = {
    options: {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24,
    },
    secret: process.env.JWT_SECRET_KEY || ''
};

/**
 * Paths
 */
export const paths = {
    whitelisted: ['/auth'],
};


/**
 * Swagger UI options
 */
export const swaggerUiOptions = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: 'https://image.flaticon.com/icons/svg/619/619063.svg',
    customSiteTitle: `${appConfig.name} : API-DOC`,
};

/**
 * Express Rate limit
 */
export const rateLimit = {
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message: 'Too many requests from this IP, please try again after sometimes'
};
