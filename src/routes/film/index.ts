import express, { Request, Response } from "express";
import FilmRepo from "../../repos/film-rapo";

const router = express.Router();

router.get('/api/films', async(_: Request, res:Response) => {
    try {
        const films = await FilmRepo.find();
        res.send(films);
    } catch (err) {
        throw new Error(err);
    }
    

});

export { router as indexMovieRouter };
