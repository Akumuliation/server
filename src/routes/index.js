import { app } from '../helpers/index.js';
import { home } from './v1/home.js';
import { auth } from './v1/auth.js';

app.use('/api/v1', home);
app.use('/api/v1/auth', auth);
