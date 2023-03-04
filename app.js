const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./err/NotFoundError');
const { celebrateAuth, celebrateRegister } = require('./validators/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('strictQuery', true);

const { NODE_ENV } = process.env;

const config = dotenv.config({
  path: NODE_ENV === 'production' ? '.env' : '.env.common',
}).parsed;

// Настройка порта
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server start on 3000 PORT');
});
