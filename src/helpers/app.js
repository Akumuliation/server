import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import ejs from 'ejs';
import rid from 'connect-rid';
import { __dirname } from './path.js';

const publicPath = path.join(__dirname, '../../public');
export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// if (process.env.NODE_ENV === 'development') {
// 	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// }
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.errorHandler());
// }
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', publicPath);
app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(rid({
  headerName: 'X-Request-ID'
}));
