import pool from "../config/pool";

class FilmRepo {
  static async find() {
      const { rows } = await pool.query('SELECT * FROM films;');
      return rows;
  }

  static async findById() {}

  static async insert(email:string, password:string) {

  }
}

export default FilmRepo;
