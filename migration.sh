DATABASE_URL=postgres://limitless@localhost:5432/difxio npm run migrate up
DATABASE_URL=postgres://limitless@localhost:5432/difxio-test npm run migrate up

dedent node-pg-migrate pg pg-format
npm run migrate create add films table
npm run migrate create add users table
npm run migrate create add comments table

DATABASE_URL=postgres://limitless@localhost:5432/difxio npm run migrate