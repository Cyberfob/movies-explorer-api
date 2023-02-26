import mongoose from 'mongoose';

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
      validator: (v) => /^https?:\/\/(www\.)?[\w-]+\.[\w./():,-]+#?$/.test(v),
      message: 'Некорректный URL-адрес изображения',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?[\w-]+\.[\w./():,-]+#?$/.test(v),
      message: 'Некорректный URL-адрес трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?[\w-]+\.[\w./():,-]+#?$/.test(v),
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

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
