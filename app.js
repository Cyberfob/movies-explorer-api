import express from 'express';
import mongoose from 'mongoose';

const { PORT } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', { autoIndex: true });

app.listen(PORT, () => {
  console.log('server is done');
});
