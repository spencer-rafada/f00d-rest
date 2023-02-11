import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { routes as foodRoutes } from './food';

export const routes = Router();

routes.get(`/`, (req: Request, res: Response, next) => {
  // #swagger.description = `Root endpoint`
  res.json(`Hello Food Lover!`);
});

routes.use(`/food`, foodRoutes);
// Routes Documentation
routes.use(`/api-docs`, swaggerUi.serve);
routes.get(`/api-docs`, swaggerUi.setup(swaggerDocument));
