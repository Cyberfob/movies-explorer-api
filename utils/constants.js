const STATUS_CREATED_201 = 201;
const regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;
const dbUrlDev = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  STATUS_CREATED_201,
  regEx,
  dbUrlDev,
};
