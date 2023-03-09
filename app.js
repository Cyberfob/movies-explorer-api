const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const ratelimiter = require('./utils/rateLimiter');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./err/NotFoundError');
const { celebrateAuth, celebrateRegister } = require('./validators/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorParser } = require('./err/ErrorParser');
const { dbUrlDev } = require('./utils/constants');

mongoose.set('strictQuery', true);

const { NODE_ENV } = process.env;

const config = dotenv.config({
  path: NODE_ENV === 'production' ? '.env' : '.env.common',
}).parsed;

// Данные БД
const PORT = process.env.PORT;

const dbUrl = process.env.DATABASE_URL || dbUrlDev;

const app = express();

mongoose.connect(dbUrl, {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const allowedCors = [
  'http://api.apetruhin.nomoredomains.work',
  'https://api.apetruhin.nomoredomains.work',
  'http://apetruhin.nomoredomains.work',
  'https://apetruhin.nomoredomains.work',
  'http://localhost:3000',
];

app.set('config', config);

app.use(cors({
  origin: allowedCors,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// мидлвар : Json
app.use(bodyParser.json());

app.use(requestLogger);

app.use(ratelimiter);

app.use(helmet());

// Роуты без авторизации
app.post('/signin', celebrateAuth, login);
app.post('/signup', celebrateRegister, createUser);

app.use(auth); // Мидлвар авторизации

// Роуты требующие авторизации

// Роуты Users
app.use('/users', users);

// Роуты Movies
app.use('/movies', movies);

// Заглушка для запроса неуществующих адресо
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorParser);

app.listen(PORT);
