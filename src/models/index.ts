import config from '../config/config';
import mongoose from 'mongoose';
import Food from './food';
import User from './user';

mongoose.Promise = global.Promise;

export default {
  mongoose: mongoose,
  url: config.dbUrl,
  port: config.port,
  food: Food(mongoose),
  user: User(mongoose)
};
