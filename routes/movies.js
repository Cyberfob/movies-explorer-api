const movies = require('express').Router();
const { celebrateCreateMovie, celebrateDeleteMovie } = require('../validators/validator');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movies.get('/', getMovies);

movies.post('/', celebrateCreateMovie, createMovie);

movies.delete('/:_id', celebrateDeleteMovie, deleteMovie);

module.exports = movies;
