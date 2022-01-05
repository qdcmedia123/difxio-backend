require("dotenv").config();
import { app } from "./app";
import pool from "./config/pool";

const start = async () => {
  try {
    await pool.connect({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    console.log("Connected to postgres");
  } catch (err) {
    throw new Error(err);
  }
};

start()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Starting server at port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
