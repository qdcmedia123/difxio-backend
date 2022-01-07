import express, { Request, Response } from "express";
const router = express.Router();
import { body } from "express-validator";
import FilmRepo from "../../repos/film-rapo";

import {
  validateRequest,
  requireAuth,
} from "@wealthface/common";

router.post(
  "/api/films",
  requireAuth,
  [
    body("name")
      .isLength({ min: 2, max: 150 })
      .withMessage("name must be valid"),
    body("description")
      .isLength({ min: 2, max: 150 })
      .withMessage("description must be valid"),
    body("realease_date")
      .isLength({ min: 8, max: 10 })
      .withMessage("realease date must be valid"),
    body("rating")
      .isLength({ min: 1, max: 5 })
      .withMessage("rating date must be valid"),
    body("ticket_price")
      .isLength({ min: 1, max: 5000 })
      .withMessage("ticket price date must be valid"),
    body("country")
      .isLength({ min: 1, max: 150 })
      .withMessage("country price date must be valid"),
    body("genre")
      .isLength({ min: 1, max: 150 })
      .withMessage("genre price date must be valid"),
    body("photo")
      .isLength({ min: 1, max: 150 })
      .withMessage("photo price date must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Get the user id

    const user_id = req.currentUser!.id;
    const film = { user_id, ...req.body };

    try {
      const saveFilm = await FilmRepo.insert(film);
      return res.send(saveFilm);
    } catch (err) {
      throw new Error(err);
    }

    return res.send(req.body);
  }
);

export { router as newFilmRouter };
