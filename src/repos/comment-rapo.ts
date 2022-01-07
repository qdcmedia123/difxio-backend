import pool from "../config/pool";

class CommentRapo {
  static async insert(comment: any) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO 
               comments
               (
                user_id, 
                film_id, 
                comment
                ) 
                VALUES($1, $2, $3) RETURNING id`,
        [comment.user_id, comment.film_id, comment.comment]
      );
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async findByFilmId(id: number) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM comments WHERE film_id='${id}'`,
        []
      );
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CommentRapo;
