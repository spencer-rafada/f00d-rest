const routes = require(`express`).Router();

routes.get(`/`, (req, res, next) => {
  res.json(`hello`);
});

routes.use(`/food`, require(`./food`));

module.exports = routes;
