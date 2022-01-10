import pool from "../config/pool";

class FilmRepo {
  static async find() {
    try {
      const films = await pool.query("SELECT films.id, films.rating, films.ticket_price, films.name, films.photo  FROM films ORDER BY created_at DESC", []);
      const { rows } = films;
      return rows;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id: any) {
    try {
      const {rows} = await pool.query(`SELECT * FROM films WHERE id = $1`, [id]);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }

  static async insert(film: any) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO 
           films
           (
            user_id, 
            name, 
            description, 
            realease_date, 
            rating,
            ticket_price,
            country,
            genre,
            photo
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          film.user_id,
          film.name,
          film.description,
          film.realease_date,
          film.rating,
          film.ticket_price,
          film.country,
          film.genre,
          film.photo,
        ]
      );
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}

export default FilmRepo;
