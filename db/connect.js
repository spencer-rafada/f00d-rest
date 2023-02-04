const { dbUrl } = require(`../config/config`);
const MongoClient = require(`mongodb`).MongoClient;
let _db;

// initialize db
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(dbUrl)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// get db
const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};
module.exports = { initDb, getDb };
