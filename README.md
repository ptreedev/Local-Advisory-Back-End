# Local Advisory API

---

Welcome to the Back-End of my events platform: Local Advisory

It implements the Seqeulize ORM and sqlite as the dev database. It also implements Authentication and Role-Based Authorisation utilising the passport jwt library.

## If you'd like to run this locally follow the below instructions

---

1. First clone the project from github onto your local machine (instructions can be found at https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Open up your cloned version in your chosen code editing software
3. Create 2 .env files (.env and .env.test) in your root directory for connecting to each of the databases. Inside these files you'll want to use DB_CONNECTION=sqlite, DB_STORAGE=location_of_database replacing "location_of_database" with the sqlite file name.
   You'll also need a JWT_SECRET="secret" so replace secret with something mysterious.
   In env.test the connection will be the same but you can use memory to store the database instead.
4. Run 'npm install' or "yarn add" in the CLI to install all of the dependencies
5. Next you'll want to run migrations to set up the tables with the command "npx sequelize-cli db:migrate" followed by seeding the tables with "npx sequelize-cli db:seed:all"
6. Check your scripts in package.json, they should look like this:

`"scripts" : {` \
 `   "dev": "ts-node-dev --respawn src/server.ts",` \
 `   "test": "NODE_ENV=test jest --runInBand"` \
`}`

you can use these to either run the tests or use the api locally.

7. To make calls to the api as an authorised user you can use either the staff account:
   `{`\
    ` "email": "staff@staff.com",` \
    `"password": "staff"` \
    `}`

or the user account

`{`\
 `  "email": "user@user.com",` \
 `  "password": "user"` \
`}`
