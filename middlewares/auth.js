const jwt = require('jsonwebtoken');
const AuthError = require('../err/AuthError.js')

module.exports = function auth(req, res, next) {
  // достаём авторизационный заголовок
  const { authorization = '' } = req.headers;
  console.log(req.headers)
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization) {
    next(new AuthError('3123'));
    return;
  }
  // извлечём токен
  const token = authorization.replace(/^Bearer*\s*/i, '');
  let payload;

  const { JWT_SECRET } = req.app.get('config');
  try {
    // пытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AuthError('321321132'));
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;
  // пропускаем запрос дальше
  next();
};