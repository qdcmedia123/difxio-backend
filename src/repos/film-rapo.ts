import pool from "../config/pool";

class FilmRepo {
  static async find() {
      const { rows } = await pool.query('SELECT * FROM films;');
      return rows;
  }

  static async findById() {}

  static async insert() {}
}

export default FilmRepo;
