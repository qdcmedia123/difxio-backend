/* eslint-disable camelcase */

/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        film_id INTEGER,
        comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
    )
    `);

  if (process.env.JEST_TEST == 0) {
    pgm.sql(
      `INSERT INTO 
        comments
        (
         user_id, 
         film_id, 
         comment
         ) 
         VALUES
            (1, 1, 'Test Comments'),
            (1, 2, 'Test Comments'),
            (1, 3, 'Test Comments')`
    );
  }
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE comments
`);
};
