import express, { Express, Request, Response, NextFunction } from 'express';
import routes from './routes';
const app: Express = express();

// Middlewares
import cors from 'cors';
import bodyParser from 'body-parser';

import mongodb from './db/connect';
import config from './config/config';

// Setting Middlewares
app
  .use(cors)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    next();
  });

app.use(`/`, routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(config.port);
    console.log(`Server is running on port ${config.port}`);
  }
});
