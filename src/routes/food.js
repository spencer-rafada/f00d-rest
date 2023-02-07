const routes = require(`express`).Router();

const foodController = require(`../controllers/food`);

// Food Routes
routes.get(`/`, foodController.getAllFood);

routes.get(`/:id`, foodController.getFood);

routes.post(`/`, foodController.addFood);

routes.put(`/:id`, foodController.updateFood);

routes.delete(`/:id`, foodController.deleteFood);

module.exports = routes;
