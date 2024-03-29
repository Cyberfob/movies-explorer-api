const Movie = require('../models/movie');

const NotFoundError = require('../err/NotFoundError');
const ForbiddenError = require('../err/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movieData) => res.send({ data: movieData }))
    .catch(next);
};
module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params._id;
  const userID = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== userID) {
        next(new ForbiddenError('Вы не можете удалять чужие фильмы'));
      }
      movie.remove()
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
