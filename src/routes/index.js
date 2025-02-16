import { app } from '../helpers/index.js';
import { home } from './v1/home.js';
import { auth } from './v1/auth.js';
import { users } from './v1/users.js';

app.use('/api/v1', home);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
