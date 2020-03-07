import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import Youch from 'youch';
import * as swaggerDocument from './swagger';

// import path from 'path';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);
        this.middlewares();
        this.routes();
        this.excepetionHandler();
        this.server.use(cors());
    }

    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(express.json());
        this.server.use(express.static(pathToSwaggerUi));
        this.server.use(
            '/swagger',
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
    }

    routes() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }

    excepetionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();

                return res.status(500).json(errors);
            }

            return res.json(500).json({ error: 'Internal server error' });
        });
    }
}

export default new App().server;
