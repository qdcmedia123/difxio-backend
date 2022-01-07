import { NotFoundError } from '@wealthface/common';
import express, { Request, Response } from 'express';
const router = express.Router();
import FilmRepo from "../../repos/film-rapo";
router.get('/api/films/:id', async(req: Request, res:Response) => {
    const { id } = req.params;
    const film = await FilmRepo.findById(parseInt(id)); 
    if(film) {
        return res.send(film);
    }
    return  new NotFoundError();
});


export { router as showFilmRouter };