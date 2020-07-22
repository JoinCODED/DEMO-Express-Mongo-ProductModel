### Discussion:

**Topics to discuss:**

- Databases
- ORMs
- Sequelize
- PostgresQL
- Installing, setting up, and creating a database

(Add discussion link here)

### Demo:

## Step 1: Setup Postgres

Let's start with installing [Postgresql](https://postgresapp.com/downloads.html).

1. For Mac users, you can use `brew` to install it.

   ```shell
     $ brew install postgresql
   ```

2. Fow Windows users, download the latest version of Postgres, and follow all the instructions.

3. The installer will asked for a password. Basically it's creating a user for the database. The default username is `postgres`. Make sure to write an easy password and write it somewhere, you might need it later!

4. After finishing the installation, open PGAdmin4. If you installed Postgres using brew, you have to manually [download it.](https://www.pgadmin.org/download/).

5. PGAdmin4 will ask for a password, this one is different from your postgres' user password. It's for accessing PGADmin4 only.

6. On the sidebar on the left, click on `Servers`, then right click on `Database` and click on `Create > Database`.

7. This will open a modal for you, give your database a name and click on `Save`.

8. Congrats! You created your first database!

## Step 2: Setup Sequelize

1. Back to our Express application, install the following:

   ```shell
   yarn add sequelize pg pg-hstore
   ```

2. Now let's connect our database with sequelize. Create a folder for all files related to the database called `db`.

3. Create a file called `db.js` where we will set our database. We will create a sequelize instance and pass it the following parameters:

   ```javascript
   const { Sequelize } = require("sequelize");

   const db = new Sequelize({
     username: "postgres",
     password: "your_password",
     database: "my_db",
     dialect: "postgres",
     host: "localhost",
   });

   module.exports = db;
   ```

4. The `username` and `password` are the ones we created when installing Postgres, `database` is the name of the database we just created and `dialect` is the type of database we're using which is Postgres. Our database instance is ready!

5. Now we will connect the database object to the app and test the connection. In `app.js` require the `db` object:

   ```javascript
   const db = require("./db/db");
   ```

6. To test the connection, we will use the `authenticate` method from `sequelize`. But since this method is asynchronous, we will save it in a function to use `async await`, then call it. Replace your `app.listen` with the following code:

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

7. If you get the `Connection to the database successful!` message, then you're ready to move to the next step. You can now remove this code or comment it out, and uncomment the old code.
