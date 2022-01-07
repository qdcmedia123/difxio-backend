import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { indexMovieRouter } from './routes/film';
import { signupRouter } from './routes/user/signup';
import { errorHandler, NotFoundError, currentUser } from "@wealthface/common";
import { currentUserRouter } from './routes/user/current-user';
import { signoutRouter } from './routes/user/signout';
import { showFilmRouter } from './routes/film/show';
const app = express();

// While using nginx/apache as proxy set this to true 
app.set('trust proxy', true); 
app.use(json());
app.use(
    cookieSession({
      signed: false,
      secure: false, //process.env.NODE_ENV !== "development",
      httpOnly: true
    })
  );

app.use(currentUser);
app.use(currentUserRouter);
app.use(indexMovieRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(showFilmRouter);

app.all('*', async() => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app}