import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// While using nginx/apache as proxy set this to true 
app.set('trust proxy', true); 
app.use(json());
app.use(cookieSession({
    signed: false, 
    secure: process.env.NODE_ENV !== 'test'
}));

app.all('*', async() => {
    throw new Error('Unable to find the route');
});

export {app}