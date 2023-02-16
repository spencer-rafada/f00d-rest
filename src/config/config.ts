import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 8080,
  dbUrl: process.env.MONGODB_URI
};
