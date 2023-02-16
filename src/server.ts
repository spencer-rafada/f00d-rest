import express, { Express, Request, Response, NextFunction } from 'express';
import { routes } from './routes';
import { auth } from 'express-openid-connect';
import authConfig from './config/auth';
const app: Express = express();

// Middlewares
import cors from 'cors';
import bodyParser from 'body-parser';

// Setting Middlewares
app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(auth(authConfig))
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    next();
  });

app.use(`/`, routes);

import db from './models/index';
db.mongoose
  .connect(db.url)
  .then(() => {
    app.listen(db.port, () => {
      console.log(`DB Connected and Server is running on Port ${db.port}`);
    });
  })
  .catch((err) => {
    console.log(`Cannot connect to the database`, err);
    process.exit();
  });
