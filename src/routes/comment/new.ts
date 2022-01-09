import express, { Request, Response } from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest, requireAuth } from "@wealthface/common";
import CommentRapo from "../../repos/comment-rapo";

router.post(
  "/api/comments",
  requireAuth,
  [
    body("film_id")
      .isLength({ min: 1 })
      .withMessage("description must be valid"),
    body("comment")
      .isLength({ min: 2, max: 5000 })
      .withMessage("comment must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user_id = req.currentUser!.id;
    const film = { user_id, ...req.body };

    try {
      const saveComment = await CommentRapo.insert(film);
      return res.send(saveComment);
    } catch (err) {
      throw new Error(err);
    }
  }
);

export { router as newCommentRouter };
