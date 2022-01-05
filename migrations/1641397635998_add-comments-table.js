/* eslint-disable camelcase */

/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        user_id int NOT NULL,
        film_id int NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (film_id) REFERENCES films(id)
    )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE comments
`);
};
