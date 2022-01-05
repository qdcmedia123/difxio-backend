/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(150),
        last_name VARCHAR(150),
        email VARCHAR(100) NOT NULL,
        password CHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users
`);
};
