import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/api/films', async(_: Request, res:Response) => {
    res.send('Hello World')
});


export { router as showMovieRouter };