import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
// import * as Sentry from '@sentry/node';

import './database';

import AppError from './app/errors/AppError';
import * as swaggerDocument from './swagger';

// import path from 'path';

import routes from './routes';
// import sentryConfig from './config/sentry';

import createLogger from './app/errors/logger';

class App {
    constructor() {
        this.server = express();
        this.server.use(cors());
        this.server.use(express.json());

        // Sentry.init(sentryConfig);

        this.routes();
        this.middlewares();
        this.handleError();
        // this.excepetionHandler();
    }

    middlewares() {
        // this.server.use(Sentry.Handlers.requestHandler());
        this.server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    routes() {
        this.server.use(routes);
        // this.server.use(Sentry.Handlers.errorHandler());
    }

    handleError() {
        this.server.use((err, request, response, _) => {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    status: 'error',
                    message: err.message,
                });
            }

            createLogger.log('error', `❌ ${err}`);

            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        });
    }

    // excepetionHandler() {
    //     this.server.use(async (err, req, res, next) => {
    //         if (process.env.NODE_ENV === 'development') {
    //             const errors = await new Youch(err, req).toJSON();

    //             return res.status(500).json(errors);
    //         }

    //         return res
    //             .json(500)
    //             .json({ error: 'Internal server error' });
    //     });
    // }
}

export default new App().server;
