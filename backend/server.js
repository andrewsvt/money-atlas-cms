const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const sessions = require('express-session');
const helmet = require('helmet');
const KnexSessionStore = require('connect-session-knex')(sessions);
const cors = require('cors');
const routes = require('./app/routes');
const knex = require('./app/dbs/pg/knex');
const logger = require('./app/lib/logger');

const port = process.env.PORT;

const store = new KnexSessionStore({
  knex,
  tablename: 'admin_sessions',
});

(async () => {
  const app = express();

  app.use(helmet());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors({
    origin: ['http://localhost:3000', 'https://dev-admin.moneyatlas.link', /\.moneyatlas\.link$/, /[http://localhost].{1,}/],
    exposedHeaders: ['X-Total-Count', 'Content-Range', 'Content-Type'],
    credentials: true,
  }));

  app.use(sessions({
    secret: process.env.SESSIONS_SECRET,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
    resave: false,
    store,
    name: 'authcookie',
  }));

  app.use('/', routes);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const error = {
      message: err.message,
    };
    if (err.errors) {
      error.errors = err.errors;
    }
    logger.error({ err });
    res.status(err.status || 500).json(error);
  });

  app.listen(port, () => {
    logger.info(`Started listening port: ${port}`);
  });
})();
