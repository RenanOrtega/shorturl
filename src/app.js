import express from 'express';
import connectDB from '../config/db.js';

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

connectDB();

import index from './routes/index.js';
import shortner from './routes/shortner.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', index);
app.use('/api', shortner);
app.use((req, res, next) => {
    res
    .status(404)
    .send('Sorry, route not found.');
  });

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running at ${process.env.BASE}`);
});