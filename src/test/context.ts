import {  randomBytes} from "crypto";
import format from "pg-format";
const { default: migrate } = require("node-pg-migrate");
import pool from "../config/pool";

const DEFAULT_OPT = {
  host: "localhost",
  port: 5432,
  database: "difxio-test",
  user: "limitless",
  password: "",
};

class Context {
  
  static async build() {
    // Randomly generating a role name to connect to PG as
    const roleName = "a" + randomBytes(4).toString("hex");

    // Connect to PG as usual
    await pool.connect(DEFAULT_OPT);

    // Create a new role
    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    // Create a schema with the same name
    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    // Disconnect entirely from PG
    await pool.close();

    // Run our migrations in the new schema
    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: "localhost",
        port: 5432,
        database: "difxio-test",
        user: roleName,
        password: roleName,
      },
    });

    // Connect to PG as the newly created role
    await pool.connect({
      host: "localhost",
      port: 5432,
      database: "difxio-test",
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(roleName: any) {
    // @ts-ignore
    this.roleName = roleName;
  }

  async close() {
    // Disconnect from PG
    await pool.close();
    // Reconnect as root user
    await pool.connect(DEFAULT_OPT);
    // Delete role and schema
    // @ts-ignore
    await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName))
     // @ts-ignore
    await pool.query(format('DROP ROLE %I', this.roleName));
    // Disconnect
    await pool.close();
  }
}

export default Context;
