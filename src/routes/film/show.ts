import express, { Request, Response } from "express";
const router = express.Router();
import FilmRepo from "../../repos/film-rapo";
import { NotFoundError } from "@wealthface/common";

router.get("/api/films/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const film = await FilmRepo.findById(parseInt(id));
  if (film.length > 0) {
    return res.send(film);
  }
  throw new NotFoundError();
});

export { router as showFilmRouter };
