/* eslint-disable camelcase */

exports.shorthands = undefined;
const password = 'f87d3cc032ff13dd4edccc776c76283fb2eaa2a4c8f87f013c637cba0703c85f45ae699a72d83e2f0557dbea831b80beb387f12a5ee7534678ad5ab6cabfccf3.'
exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(150),
        last_name VARCHAR(150),
        email VARCHAR(100) UNIQUE NOT NULL,
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
