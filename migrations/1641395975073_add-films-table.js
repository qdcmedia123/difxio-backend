/* eslint-disable camelcase */

exports.shorthands = undefined;
const photo = 'https://gravatar.com/avatar/b5004e1e3270319c1b4e9fc61c3ab58a?s=400&d=robohash&r=x';
exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE films (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        name VARCHAR(225) NOT NULL,
        description TEXT,
        realease_date date, 
        rating int CONSTRAINT max_rating CHECK (rating <= 5),
        ticket_price int NOT NULL, 
        country VARCHAR(150) NOT NULL,
        genre text[],
        photo VARCHAR,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `);

    if (process.env.JEST_TEST == 0) {
      pgm.sql(
        `INSERT INTO 
        films
        (
         user_id, 
         name, 
         description, 
         realease_date, 
         rating,
         ticket_price,
         country,
         genre,
         photo
         ) 
         VALUES
            (1, 'Test Movie', 'Test Description', '1999-01-08', 2, 100, 'UAE', array['thriller'], '${photo}'),
            (1, 'Test Movie', 'Test Description', '1999-01-08', 2, 100, 'UAE', array['thriller'], '${photo}'),
            (1, 'Test Movie', 'Test Description', '1999-01-08', 2, 100, 'UAE', array['thriller'], '${photo}')`
      );
    }
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE films
    `);
};
