const users = require('express').Router();
const { celebrateUpdateMe } = require('../validators/validator');

const { userInfo, updateUserInfo } = require('../controllers/users');

users.get('/me', userInfo);

users.patch('/me', celebrateUpdateMe, updateUserInfo);

module.exports = users;
