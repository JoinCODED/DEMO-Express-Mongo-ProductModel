### Discussion:

**Topics to discuss:**

- Databases
- ORMs
- Sequelize
- PostgresQL
- Installing, setting up, and creating a database

(Add discussion link here)

### Demo:

**Setup Sequelize**

1. Start with installing Sequelize and Postgres:

   ```shell
   yarn add sequelize pg pg-hstore
   ```

2. Now we need to configure our database. Let's start with installing [Postgres](https://www.postgresql.org/). Click on Download, choose your operating system and download the latest version. You'll be asked to create a username and password, write them somewhere as we will need the credentials later.

3. Let's create our Postgres database! We'll call it `my_db`. Replace `<db_user>` with the user you created when installing Postgres. It will ask for your password. Tadaa! We created our database!

   (REVIEW: I installed it from brew and [from here](https://postgresapp.com/downloads.html) then opened the app installed from the link and clicked on `initialize`, then the command `createdb my_db` ran without issues and without any output or input. Nowhere is a username/password involved in this.)

   (REVIEW: Comment from Abdullah's review: "does not work on windows.. I had to create a database via pgAdmin4")

   ```shell
   createdb my_db -U <db_user>
   ```

4. Now let's connect our database with sequelize. Create a folder for all files related to the database called `db`.

5. Create a file called `db.js` where we will set our database. We will create a sequelize instance and pass it the following parameters:

   ```javascript
   const { Sequelize } = require("sequelize");

   const db = new Sequelize({
     username: "postgres",
     password: "password",
     database: "my_db",
     dialect: "postgres",
     host: "localhost",
   });

   module.exports = db;
   ```

(REVIEW: I removed the username and password since they didn't make an appearance for me earlier.)

(REVIEW: Comment from Abdullah: "In windows is gives a default username which is postgres and while installing PostgreSQL you cannot create new user, so you are just asked to create new password" ... I got something similar when installing from EDB from the installation page linked above, it asked me to enter a password only, which I didn't use later.)

6. The `username` and `password` are the ones we created when installing Postgres, `database` is the name of the database we just created and `dialect` is the type of database we're using which is Postgres. Our database instance is ready!

7. Now we will connect the database object to the app and test the connection. In `app.js` require the `db` object:

   ```javascript
   const db = require("./db/db");
   ```

8. To test the connection, we will use the `authenticate` method from `sequelize`. But since this method is asynchronous, we will save it in a function to use `async await`, then call it. Comment out everything after `const app = express()` and add this:

   ```javascript
   const run = async () => {
     try {
       await db.authenticate();
       console.log("Connection to the database successful!");
     } catch (error) {
       console.error("Error connecting to the database: ", error);
     }

     await app.listen(8000, () => {
       console.log("The application is running on localhost:8000");
     });
   };

   run();
   ```

9. If you get the `Connection to the database successful!` message, then you're ready to move to the next step. You can now remove this code or comment it out, and uncomment the old code.

(REVIEW: I got that message, but also got the following line before it: `Executing (default): SELECT 1+1 AS result`)
