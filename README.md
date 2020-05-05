### Discussion:

**Topics to discuss:**

- Databases
- ORMs
- Sequelize
- PostgresQL

(Add discussion link here)

### Demo:

**Setup Sequelize**

1. Start with installing Sequelize and Postgres:

```shell
yarn add sequelize pg pg-hstore
```

2. Now we need to configure our database. Let's start with installing [Postgres](https://www.postgresql.org/). Click on Download, choose your operating system and download the latest version. You'll be asked to create a username and password, write them somewhere as we will need the credentials later.

3. Let's create our Postgres database! We'll call it `my_db`. Replace `<db_user>` with the user you created when installing Postgres. It will ask for your password. Tadaa! We created our database!

```shell
createdb my_db -U <db_user>
```

4. Now let's connect our database with sequelize. Create a folder for all files related to the database called `db`.

5. Create a file called `db` where we will set our database. According to [Sequelize's documentation](https://sequelize.org/master/manual/getting-started.html), we will create a sequelize instance and pass it the following parameters:

```javascript
const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "password",
  database: "my_db",
  dialect: "postgres",
  host: "localhost"
});

module.exports = db;
```

6. The `username` and `password` are the ones we created when installing Postgres, `database` is the name of the database we just created and `dialect` is the type of database we're using which is Postgres. Our database instance is ready!

7. Now we will connect the database object to the app and test the connection. In `app.js` require the `db` object:

```javascript
const db = require("./db");
```

8. To test the connection, we will use the `authenticate` method from `sequelize`. But since this method is asynchronous, we will save it in a function to use `async await`, then call it:

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

9. If you get the `Connection to the database successful!` message, then you're ready to move to the next step. You can now remove this code or comment it out.
