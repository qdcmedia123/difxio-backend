import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/api/film', async(_: Request, res:Response) => {
    res.send('Hello World')
});


export { router as newMovieRouter };