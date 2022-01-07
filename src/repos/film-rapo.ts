import pool from "../config/pool";

interface Film {
  user_id: number;
  name: string;
  description: string;
  realease_date: any;
}

/*
user_id: number,
    name: string,
    description: string,
    realease_date: string,
    rating: number,
    ticket_price: number,
    country: string,
    genre: object,
    photo: string
*/
class FilmRepo {
  static async find() {
    try {
      const films = await pool.query("SELECT * FROM films", []);
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
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
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
