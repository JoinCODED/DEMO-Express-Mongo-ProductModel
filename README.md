### Discussion:

**Topics to discuss:**

- Databases
- MongoDB
- MongoDB Compass
- Mongoose
- Installing, setting up, and creating a database
- Product List

### Demo:

## Step 1: Create an Atlas Account

We'll be using **MongoDB Atlas** which provides an easy way to host and manage your data in the cloud.

You can register for an Atlas account using your Google Account or an email address.

1. Go to [MongoDB website](https://www.mongodb.com/).
2. Click on **Try Free** on the upper right corner.
3. Fill in the required fields or use your Google account.
4. Click continue and fill the **about me** form.
5. Click on **Create account** button and verify your email.

With your Atlas account ready let's deploy our first database!

## Step 2: Creating your first Cluster

1. Log into your Atlas account.
2. Click on **Build a database**.
3. Select **Shared** Clusters and click **Create** a Cluster.
4. Select your **Aws** Cloud Provider & **Europe** Region
5. Click on **create** a cluster

Now your cluster is being created and it may take up to 5 mins.

## Step 3: Add Your Connection IP Address to IP Access List.

In Atlas, you can only connect to a cluster from a trusted IP address. Within Atlas, you can create a list of trusted IP addresses.

Add your IP address to the IP access list by following the steps:

1. On the left panel under **Security** Click on **Network Access**.
2. Click on **Add IP Address**.
3. A modal will open up for you and you can click on **Add current ip address** or **Allow access from anywhere**.
4. Click **confirm**.

## Step 4: Create a Database User for Your Cluster

You must create a database user to access your cluster. For security purposes, Atlas requires clients to authenticate as MongoDB database users to access clusters.

1. On the left panel under **Security** click on **Database Access**.
2. Click on **Add New Database User**.
3. A modal will open up, and select **Password** as an **Authentication Method**.
4. Choose a **username** and a **password** for your user and **save** them because we need them to access our database later.
5. For **Database User Privileges** select **Atlas Admin**.
6. Click **Add User**.

## Step 5: MongoDB Compass

**MongoDB Compass** is a powerful GUI for querying, aggregating, and analyzing your MongoDB data in a visual environment.

1. On the left panel under **Deployment** click on **Databases**.
2. You will see the cluster we created, click on **Connect** button.
3. A modal will open, select Connect using **MongoDB Compass**.
4. Select your operating system, download and setup **MongoDB Compass**.
5. Copy the connection string, then open **MongoDB Compass** app. Don't forget to change `<password>` to your user password.
6. Paste your connection string and click **Connect**

## Step 6: Setup Mongoose

1. Back to our Express application, install `mongoose`.

   ```shell
   yarn add mongoose
   ```

2. Create a file called **database.js** under the project root.

3. Import the **mongoose** module.

   ```javascript
   const mongoose = require("mongoose");
   ```

4. Connect to your database using the connect method from mongoose.

   ```javascript
   const connectDB = async () => {
     const conn = await mongoose.connect("YOUR_CONNECTION_STRING", {
       useUnifiedTopology: true,
       useNewUrlParser: true,
     });
     console.log(`mongo connected: ${conn.connection.host}`);
   };
   ```

5. To get your connection string head back to your **Atlas** account and click **Connect** next to your cluster.

6. A modal will open, select **Connect to your application**.

7. Copy your connection string and replace it with the connection string from step 4. Don't forget to change `<password>`!

8. Export!

   ```javascript
   module.exports = connectDB;
   ```

9. In app.js import the file we just created.

   ```javascript
   const connectDb = require("./database");
   ```

10. Call our method anywhere before `app.listen`.

    ```javascript
    connectDb();
    ```

## Step 7: Create Your Model

1. Create a folder called `models`. Inside it create a file called `Cookie.js`.

2. In `models`, require `mongoose`.

   ```javascript
   const mongoose = require("mongoose");
   ```

3. Let's create our schema:

   ```javascript
   const CookieSchema = mongoose.Schema({});
   ```

4. We will pass the `Schema` method an object that has all the fields we need:

   ```javascript
   const CookieSchema = mongoose.Schema({
     name: String,
     price: Number,
     description: String,
     image: String,
   });
   ```

5. Then we will create our model and export it.

   ```javascript
   module.exports = mongoose.model("Cookie", CookieSchema);
   ```

## Step 8: Cookie List

Now let's use our model in our controllers.

At this point, we wrote all our **CRUD methods** manually by accessing the data from our data file directly. But now we have **Mongoose** to take care of that. **Mongoose** provides an endless number of methods to communicate with the database. Let's use them to access our lovely new database!

All the methods we're using are from the [documentation](https://mongoosejs.com/docs/api/query.html). So make sure to take a look at it.

So let's adjust our methods in `controllers.js`.

1. First, to access our `Cookie` model, we will require it from our `models` folder:

   ```javascript
   const Cookie = require("./models/Cookie");
   ```

2. Moving to the `cookieList` method, to fetch all the cookies from our `Cookie` model, we will use a **mongoose method** called `.find()`.

3. Let's start with our `cookieCreate` method.

   ```javascript
   exports.cookieList = (req, res) => {
     const cookies = Cookie.find();
     res.json(cookies);
   };
   ```

4. Let's test it using Postman. Such a weird response! We got a `200` status code and an empty object. If you `console.log` the `cookies` array you'll see that it's returning a `Promise`, which means that this method is asynchronous!

5. To **fix** this issue we will add `async` and its soulmate `await`. And for extra precautions let's **add** a `try-catch` block in case anything went wrong. In case we had an error, we'll **change the response status code** to `500` and pass the message from `error` as a JSON response.

   ```javascript
   exports.cookieList = async (req, res) => {
     try {
       const cookies = await Cookie.find();
       res.json(cookies);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
   };
   ```

6. Let's test it again. It works!
