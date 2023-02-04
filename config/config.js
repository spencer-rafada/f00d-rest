const dotenv = require(`dotenv`);
dotenv.config();

module.exports = {
  port: process.env.PORT || 8080,
  dbUrl: process.env.MONGODB_URI
};
