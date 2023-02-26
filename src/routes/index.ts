import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { routes as foodRoutes } from './food';
import { requiresAuth } from 'express-openid-connect';
import userController from '../controllers/user';

export const routes = Router();

routes.get(`/`, userController.addUser);

routes.get('/profile', requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

routes.use(`/food`, foodRoutes);
// Routes Documentation
routes.use(`/api-docs`, swaggerUi.serve);
routes.get(`/api-docs`, swaggerUi.setup(swaggerDocument));
