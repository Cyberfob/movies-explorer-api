const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const AuthError = require('../err/AuthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Поле Почта должно быть Email',
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильная почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            throw new AuthError('Неправильная почта или пароль');
          }
          const userData = user.toObject();
          delete userData.password;
          return userData;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
