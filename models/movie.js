const mongoose = require('mongoose');
const regEx = require('../utils/constants');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => link.match(regEx),
      message: 'Некорректный URL-адрес изображения',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => link.match(regEx),
      message: 'Некорректный URL-адрес трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => link.match(regEx),
      message: 'Некорректный URL-адрес миниатюры изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
