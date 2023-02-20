const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session');

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const sessionStorage = new MongoDBStore({
    uri: process.env.CONNECTION_STRING,
    databaseName: process.env.DATABASE_NAME,
    collection: 'sessions',
  });

  return sessionStorage;
}

function sessionConfig() {
  const expiryDate = 1000 * 60 * 60 * 24 * 7;

  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: expiryDate,
      httpOnly: true,
    },
  };
}

module.exports = sessionConfig;
