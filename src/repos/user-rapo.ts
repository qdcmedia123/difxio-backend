import pool from "../config/pool";
import { Password } from "../../services/password";
class UserRapo {
  static async findByEmail(email: string) {
    try {
      const { rows } = await pool.query(
        `SELECT id FROM users WHERE email= $1;`,
        [email]
      );
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  static async insert(email: string, password: string) {
    try {
      const hashPassword = await Password.toHash(password);
      const {rows}  = await pool.query(
        `INSERT INTO users(email, password) VALUES($1, $2) RETURNING id`,
        [email, hashPassword]
      );
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserRapo;
