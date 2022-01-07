import express, { Request, Response } from "express";
const router = express.Router();
import CommentRapo from "../../repos/comment-rapo";

router.get("/api/comments/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comments = await CommentRapo.findByFilmId(parseInt(id));
    return res.send(comments);
  } catch (err) {
    throw new Error(err);
  }
});

export { router as indexCommentRouter };
