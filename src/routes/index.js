const routes = require(`express`).Router();
const swaggerUi = require(`swagger-ui-express`);
const swaggerDocument = require(`../swagger.json`);

routes.get(`/`, (req, res, next) => {
  // #swagger.description = `Root endpoint`
  res.json(`hello`);
});

routes.use(`/food`, require(`./food`));
// Routes Documentation
routes.use(`/api-docs`, swaggerUi.serve);
routes.get(`/api-docs`, swaggerUi.setup(swaggerDocument));

module.exports = routes;
