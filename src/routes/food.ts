import { Router } from 'express';
import validation from '../middleware/validation';
import { requiresAuth } from 'express-openid-connect';

export const routes = Router();
import foodController from '../controllers/food';

// Food Routes
routes.get(`/`, foodController.getAllFood);

routes.get(`/:id`, foodController.getFood);

routes.post(`/`, requiresAuth(), validation.foodValidation, foodController.addFood);

routes.put(`/:id`, requiresAuth(), validation.foodValidation, foodController.updateFood);

routes.delete(`/:id`, requiresAuth(), foodController.deleteFood);
