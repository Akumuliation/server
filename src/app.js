import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import cors from 'cors';
import ejs from 'ejs';
import rid from 'connect-rid';
import bodyParser from 'body-parser';
import { __dirname, app } from './helpers/index.js';

const publicPath = path.join(__dirname, '../../public');

// if (process.env.NODE_ENV === 'development') {
// 	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// }
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.errorHandler());
// }
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', publicPath);


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(express.json());
app.use(rid({
  headerName: 'X-Request-ID'
}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

import './routes/index.js';

export default app;
