import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import createHttpError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import { createConnection } from 'typeorm';

import indexRouter from './routes/index';
import UserRouter from './routes/user';

const app = express();
createConnection().then(() => {
  // Swagger
  const options = {
    swaggerDefinition: {
      info: {
        title: 'Express TypeScript',
        version: '1.0.0',
      },
    },
    apis: ['routes/*'],
  };
  app.use('/spec', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join('public')));

  app.use('/', indexRouter);
  app.use('/users', UserRouter);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404));
  });

  app.use((err: any, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });
});

export default app;
