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
                VALUES($1, $2, $3) RETURNING *`,
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
        `SELECT comments.id, comments.user_id, comments.film_id, comments.comment,
        comments.created_at, 
        comments.updated_at, 
        CONCAT(users.first_name, ' ',users.last_name) as name 
        FROM comments 
        INNER JOIN users 
        ON users.id = comments.id 
        WHERE film_id='${id}'`,
        []
      );
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CommentRapo;
