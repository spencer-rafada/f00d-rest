import { Router } from 'express';
import validation from '../middleware/validation';

export const routes = Router();
import foodController from '../controllers/food';

// Food Routes
routes.get(`/`, foodController.getAllFood);

routes.get(`/:id`, foodController.getFood);

routes.post(`/`, validation.foodValidation, foodController.addFood);

routes.put(`/:id`, validation.foodValidation, foodController.updateFood);

routes.delete(`/:id`, foodController.deleteFood);
