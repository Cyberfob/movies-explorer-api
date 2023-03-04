const movies = require('express').Router();
const { celebrateCreateMovie, celebrateDeleteMovie } = require('../validators/validator');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movies.get('/', getMovies);

movies.post('/', celebrateCreateMovie, createMovie);

movies.post('/_id', celebrateDeleteMovie, deleteMovie);

module.exports = movies;
