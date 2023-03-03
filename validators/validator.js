const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../utils/constants');

const celebrateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateUpdateMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const celebrateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(regEx).required(),
    trailerLink: Joi.string().uri().regex(regEx).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().regex(regEx).required(),
    movieId: Joi.number().required(),
  }),
});

const celebrateDeleteMovie = celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  celebrateAuth,
  celebrateRegister,
  celebrateCreateMovie,
  celebrateUpdateMe,
  celebrateDeleteMovie,
};
