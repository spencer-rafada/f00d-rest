const express = require(`express`);
const app = express();

// Middlewares
const cors = require(`cors`);
const bodyParser = require(`body-parser`);

const mongodb = require(`./db/connect`);
const { port } = require(`./config/config`);

// Setting Middlewares
app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    next();
  });

app.use(`/`, require(`./routes`));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});
