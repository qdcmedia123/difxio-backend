# difxio-backend
## Please update the .env variable with you details, PostgreSQL cred, required 2 database one for development and another for testing

## You can run migration using following commands in Unix base system, replace username with your user and databasename with your development databasename
`DATABASE_URL=postgres://username@localhost:5432/databasename npm run migrate up`

## for the test migration will run through the scripts, just update with newly created test database name
