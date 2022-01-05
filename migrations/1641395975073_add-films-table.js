/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE films (
        id SERIAL PRIMARY KEY,
        name VARCHAR(225) NOT NULL,
        description TEXT,
        realease_date date, 
        rating int CONSTRAINT max_rating CHECK (rating <= 5),
        ticket_price int NOT NULL, 
        country VARCHAR(150) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        photo VARCHAR,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE films
    `);
};
