import express, { Request, Response } from 'express';
import FilmRepo from '../../repos/film-rapo';
import { Password } from '../../../services/password';

const router = express.Router();

router.get('/api/films', async(_: Request, res:Response) => {
    // const films = await FilmRepo.find();
    const password = await Password.toHash("password");
    res.send(password)
});


export { router as indexMovieRouter };