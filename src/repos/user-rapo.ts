import pool from "../config/pool";
import { Password } from "../../services/password";
class UserRapo {
  static async findByEmail(email: string) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE email= $1;`,
        [email]
      );
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  static async insert(
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) {
    try {
      const hashPassword = await Password.toHash(password);
      const { rows } = await pool.query(
        `INSERT INTO users(email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *`,
        [email, hashPassword, first_name, last_name]
      );
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }
  static async count() {
    const { rows } = await pool.query(`SELECT COUNT(*) FROM users`, []);

    return parseInt(rows[0].count);
  }
  static async signin() {
    await pool.query("SELECT id FROM users WHERE email = $1");
  }
}

export default UserRapo;
