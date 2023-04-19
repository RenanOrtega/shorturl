import express from 'express';
import connectDB from '../config/db.js';

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

connectDB();

import indexRouter from './routes/index.js';
import { router } from './routes/urls.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', router);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running at ${process.env.BASE}`);
});