const routes = require(`express`).Router();

const foodController = require(`../controllers/food`);

// Food Routes
routes.get(`/`, foodController.getAllFood);

routes.post(`/`, foodController.addFood);

module.exports = routes;
