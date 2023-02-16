import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { routes as foodRoutes } from './food';
import { requiresAuth } from 'express-openid-connect';

export const routes = Router();

routes.get(`/`, (req: Request, res: Response, next) => {
  // #swagger.description = `Root endpoint`
  res.json(req.oidc.isAuthenticated() ? `Hello Food Lover!` : `Join us now!`);
});

routes.get('/profile', requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

routes.use(`/food`, foodRoutes);
// Routes Documentation
routes.use(`/api-docs`, swaggerUi.serve);
routes.get(`/api-docs`, swaggerUi.setup(swaggerDocument));
